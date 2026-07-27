import { Component, inject, signal, computed } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { CommonModule, DatePipe } from '@angular/common';
import { MurliResponse } from 'shared';
import { MurliSection } from '../../shared/components/murli-section/murli-section';
import { AppService } from '../../shared/services/app.service';
import { MurlisService } from '../../shared/services/murlis.service';
import { DatePickerModule } from 'primeng/datepicker';
export interface TabItem {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-today-murli',
  imports: [TabsModule, TagModule, DatePipe, MurliSection, DatePickerModule, CommonModule],
  templateUrl: './today-murli.component.html',
  styleUrl: './today-murli.component.scss',
})
export class TodayMurliComponent {
  private murlisService = inject(MurlisService);
  readonly appService = inject(AppService);

  selectedDate = signal(new Date());
  showDatePicker = signal(false);
  loading = signal(true);
  noMurli = signal(false);

  private rawMurli = signal<MurliResponse | null>(null);

  readonly published = computed(() => this.rawMurli()?.published ?? false);

  readonly murli = computed(() => {
    const data = this.rawMurli();
    if (!data || data.type === 'avyakt') return [];
    return this.murlisService.buildSections(data, this.appService.isRtl());
  });

  readonly avyaktSections = computed(() => {
    const data = this.rawMurli();
    if (!data || data.type !== 'avyakt') return [];
    return this.murlisService.buildSections(data, this.appService.isRtl());
  });

  readonly morningTitle = computed(() => this.rawMurli()?.songTitleEn ?? '');
  readonly morningContent = computed(() => this.rawMurli()?.songUrl ?? null);

  constructor() {}

  tabHeaders: TabItem[] = [
    { id: 'full', title: 'Full Murli', icon: 'pi pi-book text-2xl!' },
    { id: 'summary', title: 'Summary', icon: 'pi pi-list text-2xl!' },
    { id: 'song', title: 'Song', icon: 'pi pi-youtube text-2xl!' },
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchMurli(new Date());
  }
  private fetchMurli(date: Date): void {
    const dateStr = date.toLocaleDateString('en-CA');
    this.loading.set(true);
    this.noMurli.set(false);
    this.rawMurli.set(null);

    this.murlisService.getByDate(dateStr).subscribe({
      next: (data) => {
        this.rawMurli.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.noMurli.set(true);
      },
    });
  }
  onDateSelected(date: Date): void {
    this.selectedDate.set(date);
    this.showDatePicker.set(false);
    console.log(date);
    this.fetchMurli(date);
  }
}
