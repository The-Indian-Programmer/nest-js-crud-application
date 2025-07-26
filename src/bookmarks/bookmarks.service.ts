import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { returnError, returnSuccess } from "src/config/response";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BookmarksService {
    constructor(
        private prismaService: PrismaService
    ) {

    }

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        try {
            const bookmarkData = {
                title: dto.title,
                content: dto.content,
                created_at: new Date(),
                updated_at: new Date(),
                user: {
                    connect: { id: userId }
                }
            }

            const newBookmark = await this.prismaService.bookmark.create({
                data: bookmarkData,
                select: {
                    id: true,
                }
            })

            if (!newBookmark) return returnError("Failed to create bookmark", HttpStatus.INTERNAL_SERVER_ERROR);


            return returnSuccess("Bookmark created successfully", HttpStatus.CREATED, newBookmark);
        } catch (error) {
            console.log(error)
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateBookmark(userId: number, id: number, data: any) {
        try {
            // check if bookmark exists
            const bookmarks = await this.prismaService.bookmark.findFirst({
                where: {
                    id: id,
                    user_id: userId
                },
                select: {
                    id: true
                }
            })

            if (!bookmarks) return returnError("Bookmark not found", HttpStatus.NOT_FOUND);

            // update bookmark
            const updateData = {
                title: data.title,
                content: data.content,
                updated_at: new Date()
            }

            const updatedBookmark = await this.prismaService.bookmark.update({
                where: {
                    id: id
                },
                data: updateData,
                select: {
                    id: true,
                    
                }
            })

            if (!updatedBookmark) return returnError("Failed to update bookmark", HttpStatus.INTERNAL_SERVER_ERROR);

            return returnSuccess("Bookmark updated successfully", HttpStatus.OK, updatedBookmark);

        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteBookmark(userId: number, id: number) {
        try {
            // check if bookmark exists
            const bookmarks = await this.prismaService.bookmark.findFirst({
                where: {
                    id: id,
                    user_id: userId
                },
                select: {
                    id: true
                }
            })

            if (!bookmarks) return returnError("Bookmark not found", HttpStatus.NOT_FOUND);

            // delete bookmark
            const deletedBookmark = await this.prismaService.bookmark.delete({
                where: {
                    id: id
                },
                select: {
                    id: true
                }
            })

            if (!deletedBookmark) return returnError("Failed to delete bookmark", HttpStatus.INTERNAL_SERVER_ERROR);

            return returnSuccess("Bookmark deleted successfully", HttpStatus.OK, deletedBookmark);
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBookmark(userId: number, id: number) {
        try {
            const bookmarks = await this.prismaService.bookmark.findFirst({
                where: {
                    id: id,
                    user_id: userId
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    created_at: true,
                    updated_at: true
                }
            })

            if (!bookmarks) return returnError("Bookmark not found", HttpStatus.NOT_FOUND);

            return returnSuccess("Bookmark fetched successfully", HttpStatus.OK, bookmarks);
        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBookmarkList(userId: number, query: any) {
        try {
            const { page = 1, limit = 10 } = query;
            const skip = (page - 1) * limit;

            const bookmarks = await this.prismaService.bookmark.findMany({
                where: {
                    user_id: userId
                },
                // include: {
                //     user: {
                //         select: {
                //             id: true,
                //             email: true
                //         }
                //     }
                // },
                skip: skip,
                take: limit,
                orderBy: {
                    created_at: 'desc'
                }
            })

            if (!bookmarks || bookmarks.length === 0) return returnError("No bookmarks found", HttpStatus.NOT_FOUND);

            const totalBookmarks = await this.prismaService.bookmark.count({
                where: {
                    user_id: userId
                }
            });

            const totalPages = Math.ceil(totalBookmarks / limit);
            return returnSuccess("Bookmarks fetched successfully", HttpStatus.OK, {
                data: bookmarks,
                meta: {
                    page: page,
                    limit: limit,
                    totalPages: totalPages,
                    totalItems: totalBookmarks
                }
            });


        } catch (error) {
            return returnError("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}