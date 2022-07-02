import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-movies-navbar',
  templateUrl: './movies-navbar.component.html',
  styleUrls: ['./movies-navbar.component.css']
})
export class MoviesNavbarComponent implements OnInit {

  isMenuCollapsed: boolean = true;
  innerWidth: number = window.innerWidth;
  modifClassNav: boolean = false;
  resizeObservable$?: Observable<Event>;
  resizeSubscription$?: Subscription;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
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
