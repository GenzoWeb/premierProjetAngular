import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Serie } from '../../interface/series';
import { NetflixService } from '../../netflix.service';

@Component({
  selector: 'app-slider-series',
  templateUrl: './slider-series.component.html',
  styleUrls: ['./slider-series.component.css']
})
export class SliderSeriesComponent implements OnInit {

  @Input() series!: Serie[];

  @Output()
  sendSerie: EventEmitter<Serie> = new EventEmitter<Serie>();

  urlBaseImageGenre: string = "https://image.tmdb.org/t/p/w154";
  begin: boolean = true;
  arrowLeft: boolean = false;
  arrowRight: boolean = false;
  Zindex: boolean = false;
  currentImage: number = 1;
  imageWidth!: number;
  itemsClone:number = 10;
  slideVisible!: number;
  slider!: HTMLElement;
  testTouchScreen!: boolean;

  constructor( private netflixService : NetflixService) { }

  ngOnInit() {
    this.testTouchScreen = this.touchScreen();

    if(this.testTouchScreen) {
      this.toggleRight();
    }
  }

  touchScreen() {
    try{  
      document.createEvent("TouchEvent");  
      return true;
    } catch(e){  
      return false;  
    }
  }

  toggleArrow() {
    if(!this.testTouchScreen) {
      if(!this.begin) {
        this.toggleLeft();
      }
      this.toggleRight();
    }
  }

  toggleLeft(): boolean {
    return this.arrowLeft = !this.arrowLeft; 
  }

  toggleRight(): boolean {
    return this.arrowRight = !this.arrowRight; 
  }

  numberImageSlideReceived(numberSlide:number) {
    this.slideVisible = numberSlide
  }

  sliderElementReceived(slider:HTMLElement) {
    this.slider = slider
  }

  addZindex() {
    this.Zindex = true;
  }

  removeZindex() {
    this.Zindex = false;
  }

  serieSend(serie:Serie) {
    this.sendSerie.emit(serie)
  }

  goRight() {
    this.currentImage++;
    this.arrowLeft = true;
    if(this.begin && this.series) {
      this.cloneElt(this.series)
    }
    this.begin = false;
  }

  goLeft() {
    this.currentImage--;
  }

  imageWidthReceived(imageWidth:number) {
    this.imageWidth = imageWidth;
  }

  cloneElt(series:Serie[]) {
    series = [
      ...series.slice(series.length - (this.itemsClone)),
      ...series,
      ...series.slice(0, this.itemsClone)
    ]

    this.series = series;
  }

  addFavorite(serie: Serie): boolean {
    this.toggleArrow();
    this.netflixService.addSerie(serie);
    return this.netflixService.favoriteExist(serie.id);
  }

  testFavorite(id: number): boolean {
    return this.netflixService.favoriteExist(id);
  }
}