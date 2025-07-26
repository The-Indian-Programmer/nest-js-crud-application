import { Body, Controller, Get, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { ProfileUpdateDto } from './dto';
import { UserService } from './user.service';
import { returnError } from 'src/config/response';


@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get('me')
    async getMe(@GetUser() user: any, @GetUser('email') email: string) {
        try {
            return user
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtGuard)
    @Patch('me')
    async updateProfile(@GetUser() user: any, @Body() dto: ProfileUpdateDto) {
        try {
            const response = await this.userService.updateProfile(user.id, dto);
            return response;
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
