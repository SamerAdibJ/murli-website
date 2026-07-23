import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DatePipe } from '@angular/common';
export interface TabItem {
  id: string;
  title: string;
  icon: string;
}
@Component({
  selector: 'app-today-murli',
  imports: [TabsModule, DatePipe],
  templateUrl: './today-murli.component.html',
  styleUrl: './today-murli.component.scss',
})
export class TodayMurliComponent {
  tabHeaders: TabItem[] = [
    { id: 'full', title: 'Full Murli', icon: 'pi pi-book text-2xl!' },
    { id: 'summary', title: 'Summary', icon: 'pi pi-list text-2xl!' },
    { id: 'song', title: 'Song', icon: 'pi pi-youtube text-2xl!' },
  ];

  today: Date = new Date();
}
