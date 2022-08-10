import { Component, Input, OnInit } from '@angular/core';
import { Serie } from '../../interface/series';
import { NetflixService } from '../../netflix.service';

@Component({
  selector: 'app-series-top-views',
  templateUrl: './series-top-views.component.html',
  styleUrls: ['./series-top-views.component.css']
})
export class SeriesTopViewsComponent implements OnInit {

  series!: Serie[];
  widthImage: boolean = true;
  serieId!: number;
  serieVote?: number; 
  toggleInfos?: boolean;

  constructor( private netflixService: NetflixService) { }

  ngOnInit() {
    this.netflixService.getSeriesTop().subscribe(series => this.series = series);
  }

  receiveSerie(serie:Serie) {
    this.serieId = serie.id;
    this.serieVote = serie.vote_average;
  }

  receiveToggleInfos(bool: boolean) {
    this.toggleInfos = bool;
  }
}
