import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { CreateBookmarkDto, ListBookmarkQueryDto, UpdateBookmarkDto } from "./dto/index";
import { returnError } from "src/config/response";
import { BookmarksService } from "./bookmarks.service";


@Controller('bookmarks')
export class BookmarksController {

    constructor (
        private bookmarksService: BookmarksService
    ) {}

    @UseGuards(JwtGuard)
    @Post('')
    async createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
        try {
            const response = await this.bookmarksService.createBookmark(userId, dto);
            return response;
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @UseGuards(JwtGuard)
    @Patch(':id')
    async updateBookmark(@GetUser('id') userId: number, @Body() data: UpdateBookmarkDto, @Param('id', ParseIntPipe) id: number) {
        try {
           const response = await this.bookmarksService.updateBookmark(userId, id, data); 
           return response;
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number) {
        try {
            const response = await this.bookmarksService.deleteBookmark(userId, id);
            return response;
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number) {
        try {
            const response = await this.bookmarksService.getBookmark(userId, id);
            return response;
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @UseGuards(JwtGuard)
    @Get('')
    async getBookmarkList(@GetUser('id') userId: number, @Query() query: ListBookmarkQueryDto) {
        try {
            const response = await this.bookmarksService.getBookmarkList(userId, query);
            return response;
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}