import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  @Input() currentImage!: number;
  @Input() slideVisible!: number;
  @Input() slider!: HTMLElement;
  @Input() itemsClone!: number;

  @Output()
  imageWidth: EventEmitter<number> = new EventEmitter<number>();

  firstClick: boolean = true
  image?: Element;
  imageWidthTotal!: number;
  translate!: number;

  constructor() { }

  @HostListener('click') 
  clickNext() {
    if(this.firstClick) {
      this.initSlider();
    }

    let current: number = -this.currentImage * this.slideVisible
    let translate: number = this.imageWidthTotal * current;
    this.slider.style.transform = `translateX(${translate}px)`;
  }

  initSlider() {
    this.image = this.slider.children[0];
    const widthImage:number = this.image.getBoundingClientRect().width;
    const marginLeft:number = parseFloat(window.getComputedStyle(this.image, null)['marginLeft']);
    const marginRight:number = parseFloat(window.getComputedStyle(this.image, null)['marginRight']);
    this.imageWidthTotal = widthImage + marginLeft + marginRight;
    this.imageWidth.emit(this.imageWidthTotal);
    this.translate = -this.imageWidthTotal * this.itemsClone;
    this.slider.style.marginLeft = `${this.translate}px`;
    this.firstClick = false;
  }
}
