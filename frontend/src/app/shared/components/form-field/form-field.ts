import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [],
  template: `
    <div class="flex-1 flex-column gap-2">
      <label [for]="controlId" class="text-sm font-semibold text-color block mb-2">
        {{ label }}
        @if (required) {
          <span class="text-red-500">*</span>
        }
      </label>
      <ng-content />
      @if (error) {
        <small class="text-red-500 text-xs">{{ error }}</small>
      }
    </div>
  `,
})
export class FormField {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) controlId!: string;
  @Input() error?: string | null;
  @Input() required = false;
}
