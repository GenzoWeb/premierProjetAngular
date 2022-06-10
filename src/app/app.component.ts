import { Component, ElementRef, HostListener } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'apiTmdb';
  isMenuCollapsed = true;
  innerWidth: number = window.innerWidth;
  modifClassNav: boolean = false;
  resizeObservable$: Observable<Event> | undefined;
  resizeSubscription$: Subscription | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() { 
    if (this.innerWidth < 992) {
      this.modifClassNav = true;
    }

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      if (window.innerWidth < 992 || this.innerWidth < 992) {
        this.modifClassNav = true;
      } else {
        this.modifClassNav = false;
      }
    })
  }

  @HostListener('window:resize', ['$event'])onResize() {
    this.innerWidth = window.innerWidth; 
  }
}
