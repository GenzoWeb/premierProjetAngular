import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[netflixBackgroundNavbar]'
})
export class BackgroundNavbarDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'transparent';
   }

  @HostListener('window:scroll') 
  scrollWindow() {
    if(window.pageYOffset == 0 ) {
      this.el.nativeElement.style.backgroundColor = 'transparent';
    } else {
      this.el.nativeElement.style.backgroundColor = '#141414';
    }
  }
}