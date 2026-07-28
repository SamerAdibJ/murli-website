import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-murli-section',
  standalone: true,
  imports: [],
  templateUrl: './murli-section.html',
  styleUrl: './murli-section.scss',
})
export class MurliSection {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input({ required: true }) content!: string | null;
  @Input() editing = false;
  @Output() contentChange = new EventEmitter<string>();
}
