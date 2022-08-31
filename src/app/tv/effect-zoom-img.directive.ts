import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEffectZoomImg]'
})
export class EffectZoomImgDirective implements OnInit {

  timeout:any;
  testTouchScreen!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2,) { }

  ngOnInit() {
    this.testTouchScreen = this.touchScreen();
  }

  touchScreen() {
    try{  
      document.createEvent("TouchEvent");  
      return true;
    } catch(e){  
      return false;  
    }
  }

  @HostListener('mousemove') 
  onMouseMove() {
    if(!this.testTouchScreen) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout( () => {
        this.addClass('effect-image', this.el.nativeElement)
      },700);
    }
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    clearTimeout(this.timeout);
    this.removeClass('effect-image', this.el.nativeElement)
  }

  addClass(className: string, element: any) {
    this.renderer.addClass(element, className);
  }

  removeClass(className: string, element: any) {
      this.renderer.removeClass(element, className);
  }
}