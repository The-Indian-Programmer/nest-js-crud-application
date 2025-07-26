import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(15, { message: 'Title must be at least 15 characters long' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(100, { message: 'Content must be at least 100 characters long' })
  content: string;
}