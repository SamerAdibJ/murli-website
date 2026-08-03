import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [QuillModule, FormsModule],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditor),
      multi: true,
    },
  ],
})
export class TextEditor implements ControlValueAccessor {
  @Input() placeholder = 'Write something...';

  @Input() readonly = false;

  value = '';
  onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ direction: 'rtl' }],
      ['clean'],
    ],
  };

  onValueChange(val: string) {
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(val: string): void {
    this.value = val || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}
