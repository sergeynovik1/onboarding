import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './consts/directives/drag-and-drop.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [CommonModule, DragAndDropDirective],
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DragAndDropComponent,
      multi: true,
    },
  ],
})
export class DragAndDropComponent implements ControlValueAccessor, OnInit {
  @Input()
  public multiple: boolean = false;
  @Input()
  public acceptTypes: string | undefined;
  @Input()
  public isMedia: boolean = false;
  @ViewChild('input', { static: true })
  public inputRef: ElementRef | undefined;
  public selectedFiles: File[] | undefined;
  public imagePreview: string | undefined;
  private onChange: ((value: any) => void) | undefined;
  private onTouch: (() => void) | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.selectedFiles = [];
  }

  public onFilesChanges(files: File[]) {
    this.onChange && this.onChange([files[0]]);
    this.onTouch && this.onTouch();
    this.readFile(files[0]);
  }

  public onInputChange(input: any) {
    if (input.files && input.files[0]) {
      this.onFilesChanges(Object.values(input.files));
      this.readFile(input.files[0]);
    }
  }

  public resetImage() {
    this.selectedFiles = [];
    this.imagePreview = undefined;
    this.inputRef!.nativeElement.value = '';
    this.onChange && this.onChange([]);
    this.onTouch && this.onTouch();
  }

  writeValue(files: File[]): void {
    this.selectedFiles = files;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }
}
