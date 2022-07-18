import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  @Input() currentImage!: number;
  @Input() slideVisible!: number;
  @Input() imageWidth!: number;
  @Input() slider!: HTMLElement;

  constructor() { }

  @HostListener('click') 
  clickPrev() {
    const current: number = (this.currentImage - 2) * this.slideVisible
    const translate:number = -this.imageWidth * current;

    this.slider.style.transform = `translateX(${translate}px)`;
  }
}
