import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-netflix-navbar',
  templateUrl: './netflix-navbar.component.html',
  styleUrls: ['./netflix-navbar.component.css']
})
export class NetflixNavbarComponent implements OnInit {

  isMenuCollapsed: boolean = true;
  logoNetflix: string = "assets/images/logo.png";
  size: boolean | undefined;
  
  constructor() { }

  ngOnInit() {
    if(window.innerWidth < 992) {
      this.size = true;
    } else {
      this.size = false;
    }
  }

  @HostListener('window:resize') onResize() {
    if(window.innerWidth < 992) {
      this.size = true;
    } else {
      this.size = false;
    }
  }
}
