import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { ok } from '../common/helpers/response';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  async create(
    @GetUser() user: { id: string },
    @Body() data: CreateBookmarkDto,
  ) {
    const bookmark = await this.bookmarksService.create({
      ...data,
      userId: user.id,
    });
    return ok(bookmark, 'Bookmark created successfully');
  }

  @Get()
  async list(@GetUser() user: { id: string }) {
    const bookmarks = await this.bookmarksService.list(user.id);
    return ok(bookmarks, 'Bookmarks fetched successfully');
  }

  @Delete(':murliId')
  async remove(
    @GetUser() user: { id: string },
    @Param('murliId', ParseIntPipe) murliId: number,
  ) {
    await this.bookmarksService.remove(user.id, murliId);
    return ok(null, 'Bookmark removed successfully');
  }
}
