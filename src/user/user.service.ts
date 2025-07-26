import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProfileUpdateDto } from "./dto";
import { returnError, returnSuccess } from "src/config/response";
import * as argon2 from "argon2";


@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async updateProfile(userId: number, dto: ProfileUpdateDto) {
        try {
            const userExists = await this.prismaService.user.findUnique({
                where: { id: userId },
                select: { id: true, password: true}
            })
            if (!userExists) return returnError("User not found", HttpStatus.NOT_FOUND);
            const isPasswordValid = await argon2.verify(userExists.password, dto.password);

            if (!isPasswordValid) return returnError("Invalid password", HttpStatus.UNAUTHORIZED);

            const updateData = {
                password: await argon2.hash(dto.newPassword),
                updated_at: new Date()
            }

            const updateUser = await this.prismaService.user.update({
                where: { id: userId },
                data: updateData,
                select: { id: true, email: true, updated_at: true }
            })

            if (!updateUser) return returnError("Failed to update profile", HttpStatus.INTERNAL_SERVER_ERROR);

            return returnSuccess("Profile updated successfully", HttpStatus.OK, updateUser);
            
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}