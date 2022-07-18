import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Serie } from '../../interface/series';
import { NetflixService } from '../../netflix.service';

@Component({
  selector: 'app-series-by-genres',
  templateUrl: './series-by-genres.component.html',
  styleUrls: ['./series-by-genres.component.css']
})
export class SeriesByGenresComponent implements OnInit {

  @Input() genreId!: number;
  @Input() genreName!: string;

  @Output()
  sendSerie: EventEmitter<Serie> = new EventEmitter<Serie>();
  
  series?: Serie[];
  urlBaseImageGenre: string = "https://image.tmdb.org/t/p/w154";
  urlTestImage: string = "assets/images/cinema.jpg";
  arrowRight: boolean = false;
  arrowLeft: boolean = false;
  Zindex: boolean = false;
  begin: boolean = true;
  moreInfos: boolean = false;
  serieId!: number;
  serieVote!: number;
  currentImage: number = 1;
  imageWidth!: number;
  slideVisible!: number;
  slider!: HTMLElement;
  itemsClone:number = 10;

  constructor(private netflixService: NetflixService) { }

  ngOnInit() {
    this.netflixService.getSeriesByGenres(this.genreId).subscribe(series => {
      this.series = series
    })
  }

  cloneElt(series:Serie[]) {
    series = [
      ...series.slice(series.length - (this.itemsClone)),
      ...series,
      ...series.slice(0, this.itemsClone)
    ]

    this.series = series;
  }

  toggleArrow() {
    if(!this.begin) {
      this.toggleLeft();
    }
    this.toggleRight();
  }

  toggleLeft(): boolean {
    return this.arrowLeft = !this.arrowLeft; 
  }

  toggleRight(): boolean {
    return this.arrowRight = !this.arrowRight; 
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

  addZindex() {
    this.Zindex = true;
  }

  removeZindex() {
    this.Zindex = false;
  }

  imageWidthReceived(imageWidth:number) {
    this.imageWidth = imageWidth;
  }

  numberImageSlideReceived(numberSlide:number) {
    this.slideVisible = numberSlide
  }

  sliderElementReceived(slider:HTMLElement) {
    this.slider = slider
  }
}
