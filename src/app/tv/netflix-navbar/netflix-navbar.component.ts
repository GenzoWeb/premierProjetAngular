import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Serie } from '../interface/series';
import { NetflixService } from '../netflix.service';

@Component({
  selector: 'app-netflix-navbar',
  templateUrl: './netflix-navbar.component.html',
  styleUrls: ['./netflix-navbar.component.css']
})
export class NetflixNavbarComponent implements OnInit {

  @Output()
  sendToggleInfos: EventEmitter<boolean> = new EventEmitter<boolean>();

  isMenuCollapsed: boolean = true;
  logoNetflix: string = "/projet9/assets/images/logo.png";
  size: boolean | undefined;
  searchBar: boolean = false;
  searchTerms = new Subject<string>();
  searchResults$?: Observable<Serie[]>;
  seriesList: boolean = true;
  moreInfos: boolean = false;
  serieId!: number;
  serieVote?: number;
  serieName!: string;
  widthImage: boolean = true;
  
  constructor( private netflixService: NetflixService) { }

  ngOnInit() {
    if(window.innerWidth < 992) {
      this.size = true;
    } else {
      this.size = false;
    }
    
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.netflixService.seriesSearchList(term))
    );
    this.closeInfos()
  }

  @HostListener('window:resize') onResize() {
    if(window.innerWidth < 992) {
      this.size = true;
    } else {
      this.size = false;
    }
  }

  searchSerie(term: string) {
    this.searchTerms.next(term);
  }

  closeInfos() {
    this.sendToggleInfos.emit(false);
    this.moreInfos = false;
  }

  serieInfos(serie: Serie) {
    this.moreInfos = true;
    this.serieId = serie.id;
    this.serieVote = serie.vote_average;
    this.serieName = serie.name;
    this.sendToggleInfos.emit(true);
  }
}
