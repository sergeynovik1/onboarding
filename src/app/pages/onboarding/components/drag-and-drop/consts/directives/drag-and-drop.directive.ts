import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({ selector: '[drag-n-drop]', standalone: true })
export class DragAndDropDirective {
  @Output()
  public filesChange: EventEmitter<File[]> = new EventEmitter();

  constructor(private el: ElementRef) {}

  @HostListener('dragover', ['$event'])
  public onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.classList.add('dragenter');
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = this.el.nativeElement;
    const relatedTarget = event['relatedTarget'] || event['toElement'];
    if (!dropzone.contains(relatedTarget)) {
      dropzone.classList.remove('dragenter');
    }
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.classList.remove('dragenter');
    let files = Object.values(event.dataTransfer.files) as File[];
    this.filesChange.emit(files);
  }
}
