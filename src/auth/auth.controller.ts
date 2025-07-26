import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto } from "./dto";
import { returnError } from "src/config/response";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('sign-up')
    async signUp(@Body() dto: AuthDto) {
        try {
            const response = await this.authService.signUp(dto);
            return response;
        } catch (error) {
           return returnError("Internal server error", 500);
        }
    }

    @Post('sign-in')
    async signIn(@Body() dto: LoginDto) {
        try {
            const response = await this.authService.signIn(dto);
            return response;
        } catch (error) {
            return returnError("Internal server error", 500);
        }
    }
    
}