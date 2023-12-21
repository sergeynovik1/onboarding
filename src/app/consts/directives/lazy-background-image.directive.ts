import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyBackgroundImage]',
})
export class LazyBackgroundImageDirective implements OnInit {
  @Input()
  public lowQualityImage: string | undefined;
  @Input()
  public highQualityImage: string | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const img = new Image();
    img.src = this.lowQualityImage || '';

    img.onload = () => {
      this.el.nativeElement.style.background = `url(${this.lowQualityImage})`;
      const highQualityImg = new Image();
      highQualityImg.src = this.highQualityImage || '';

      highQualityImg.onload = () => {
        this.el.nativeElement.style.background = `url(${this.highQualityImage})`;
      };
    };
  }
}
