import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto } from "./dto";
import * as argon2 from "argon2";
import { returnError, returnSuccess } from "../config/response";
import httpStatus from 'http-status'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService
    ) { }

    async signIn(dto: LoginDto) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: dto.email
                },
            })

            if (!user) return returnError("User not found", httpStatus.NOT_FOUND);

            const isPasswordValid = await argon2.verify(user.password, dto.password);
            if (!isPasswordValid) return returnError("Invalid password", httpStatus.UNAUTHORIZED);

            const { password, ...userData } = user; // Exclude password from response


            const token = await this.generateToken(user.id, user.email);
            return returnSuccess("User signed in successfully", httpStatus.OK, token);
        } catch (error) {
            console.error("Error in signIn:", error);
            return returnError("Internal server error", httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async signUp(dto: AuthDto) {
        try {
            const existingUser = await this.prismaService.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            if (existingUser) return returnError("Email already exists", httpStatus.BAD_REQUEST);

            const hashPassword = await argon2.hash(dto.password);

            const userData = { email: dto.email, password: hashPassword, created_at: new Date(), updated_at: new Date() };

            const response = await this.prismaService.user.create({
                data: userData,
                select: { id: true, email: true, created_at: true }
            })

            if (!response) return returnError("User creation failed", httpStatus.BAD_REQUEST);
            return returnSuccess("User created successfully", httpStatus.CREATED, response);
        } catch (error) {
            console.error("Error in signUp:", error);
            return returnError("Internal server error", httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async generateToken(userId: number, email: string): Promise<{ access_token: string }> {
        try {
            const payload = { sub: userId, email };
            const token = this.jwtService.sign(payload, {
                secret: this.config.get('JWT_SECRET'), 
                expiresIn: '1h' // Token expiration time
            });

            return { access_token: token };
        } catch (error) {
            throw new Error("Token generation failed");
        }
    }
}