import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEffectZoomImg]'
})
export class EffectZoomImgDirective {

  timeout:any;

  constructor(private el: ElementRef, private renderer: Renderer2,) { }

  @HostListener('mousemove') onMouseMove() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
      this.addClass('effect-image', this.el.nativeElement)
    },700);
  }

  @HostListener('mouseleave') onMouseLeave() {
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
