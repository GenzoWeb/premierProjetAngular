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

  constructor(private netflixService: NetflixService) { }

  ngOnInit() {
    this.netflixService.getSeriesByGenres(this.genreId).subscribe(series => {
      this.series = series
    })
  }

  receiveSerie(serie:Serie) {
    this.sendSerie.emit(serie)
  }
}
