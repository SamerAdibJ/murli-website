import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppService } from '../../shared/services/app.service';

export interface Bookmark {
  id: number;
  date: Date;
  titleAr: string;
  createdAt: Date;
}

@Component({
  selector: 'app-bookmarks',
  imports: [DatePipe, CardModule, ButtonModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent {
  constructor(public appService: AppService) {}

  bookmarks: Bookmark[] = [
    {
      id: 1,
      date: new Date('2026-07-14'),
      titleAr: 'روح کی طاقت',
      createdAt: new Date('2026-07-21'),
    },
    {
      id: 2,
      date: new Date('2026-07-12'),
      titleAr: 'محبت کا دریا',
      createdAt: new Date('2026-07-19'),
    },
    {
      id: 3,
      date: new Date('2026-07-09'),
      titleAr: 'روحانی سکون',
      createdAt: new Date('2026-07-16'),
    },
    {
      id: 4,
      date: new Date('2026-07-07'),
      titleAr: 'صبر کا پھل',
      createdAt: new Date('2026-07-14'),
    },
    {
      id: 5,
      date: new Date('2026-07-02'),
      titleAr: 'نور کی راہ',
      createdAt: new Date('2026-07-09'),
    },
    {
      id: 6,
      date: new Date('2026-06-28'),
      titleAr: 'تقدیر کا فیصلہ',
      createdAt: new Date('2026-07-05'),
    },
  ];

  daysAgo(date: Date): string {
    const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  }

  onRemove(bookmark: Bookmark): void {
    this.bookmarks = this.bookmarks.filter((b) => b.id !== bookmark.id);
  }
}
