import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { ok } from '../common/helpers/response';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  async create(@Body() data: CreateBookmarkDto) {
    const bookmark = await this.bookmarksService.create(data);
    return ok(bookmark, 'Bookmark created successfully');
  }

  @Get()
  async list(@Query('userId') userId: string) {
    const bookmarks = await this.bookmarksService.list(userId);
    return ok(bookmarks, 'Bookmarks fetched successfully');
  }

  @Delete(':murliId')
  async remove(
    @Query('userId') userId: string,
    @Param('murliId', ParseIntPipe) murliId: number,
  ) {
    await this.bookmarksService.remove(userId, murliId);
    return ok(null, 'Bookmark removed successfully');
  }
}
