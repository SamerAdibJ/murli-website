import { Component, inject, signal, computed } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DatePipe } from '@angular/common';
import { MurliSection } from '../../shared/components/murli-section/murli-section';
import { AppService } from '../../shared/services/app.service';
import { MurlisService, MurliSectionData } from '../../shared/services/murlis.service';

export interface TabItem {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-today-murli',
  imports: [TabsModule, DatePipe, MurliSection],
  templateUrl: './today-murli.component.html',
  styleUrl: './today-murli.component.scss',
})
export class TodayMurliComponent {
  private murlisService = inject(MurlisService);
  readonly appService = inject(AppService);

  today = new Date();
  loading = signal(true);
  error = signal('');

  murli = signal<MurliSectionData[]>([]);
  avyaktSections = signal<MurliSectionData[]>([]);

  morningTitle = signal('');
  morningContent = signal<string | null>(null);

  constructor() {
    this.fetchToday();
  }

  tabHeaders: TabItem[] = [
    { id: 'full', title: 'Full Murli', icon: 'pi pi-book text-2xl!' },
    { id: 'summary', title: 'Summary', icon: 'pi pi-list text-2xl!' },
    { id: 'song', title: 'Song', icon: 'pi pi-youtube text-2xl!' },
  ];

  private fetchToday(): void {
    this.murlisService.getToday().subscribe({
      next: (data) => {
        const isRtl = this.appService.isRtl();
        const all = this.murlisService.buildSections(data, isRtl);

        if (data.type === 'avyakt') {
          this.avyaktSections.set(all);
        } else {
          this.murli.set(all);
          this.morningTitle.set(data.songTitle ?? '');
          this.morningContent.set(data.songUrl);
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to load today's Murli.");
        this.loading.set(false);
      },
    });
  }
}
