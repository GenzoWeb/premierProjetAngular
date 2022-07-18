import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective implements OnInit {

  constructor(private el: ElementRef ) { }

  @Input() currentImage!: number;
  @Input() imageWidth!: number;
  @Input() itemsClone!: number;

  @Output()
  numberImageSlide: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  sliderElement: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  @Output()
  currentImageChange: EventEmitter<number> = new EventEmitter<number>();
  
  slideVisible: number = 2;
  slider: HTMLElement = this.el.nativeElement;
  item: HTMLCollection = this.slider.children;
  buttons: any;
  
  ngOnInit(): void {
    this.numberImageSlide.emit(this.slideVisible);
    this.sliderElement.emit(this.slider);
  }

  @HostListener('transitionstart')
  buttonsDisabled() {
    this.buttons = [...document.getElementsByClassName("arrow-slider")].map(button => button.setAttribute("disabled", "disabled"));
  }

  @HostListener('transitionend')
  transitionInfinite() {
    this.buttons = [...document.getElementsByClassName("arrow-slider")].map(button => button.removeAttribute("disabled"));
    const currentValue: number = Math.ceil((this.el.nativeElement.children.length - 2 * this.itemsClone) / this.slideVisible);

    if(this.currentImage < 1) {
      const current: number = this.currentImage - this.slideVisible + this.el.nativeElement.children.length - 2 * this.itemsClone;
      const translate: number = current * -this.imageWidth;
      this.translateSlider(translate, currentValue);
    }

    if(this.currentImage > currentValue) {
      this.translateSlider(0, 1);
    }
  }

  private translateSlider(translation:number, currentValue:number) {
    this.el.nativeElement.style.transition = 'none';
    this.el.nativeElement.style.transform = `translateX(${translation}px)`;
    this.currentImageChange.emit(currentValue);
    this.el.nativeElement.offsetHeight;
    this.el.nativeElement.style.transition = '';
  }
}
