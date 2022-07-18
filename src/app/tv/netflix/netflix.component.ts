import { Component, OnInit } from '@angular/core';
import { GenreTv, Serie } from '../interface/series';
import { NetflixService } from '../netflix.service';

@Component({
  selector: 'app-netflix',
  templateUrl: './netflix.component.html',
  styleUrls: ['./netflix.component.css']
})
export class NetflixComponent implements OnInit {

  serie?: Serie;
  urlBaseImage: string = "https://image.tmdb.org/t/p/original";
  urlTestImage: string = "assets/images/cinema.jpg";
  moreInfos: boolean = false;
  serieId!: number;
  serieVote?: number;
  genres?: any;

  constructor(private netflixService: NetflixService) { }

  ngOnInit() {
    this.netflixService.getSeries().subscribe(serie => this.serie = serie);
    this.netflixService.getGenresListTv().subscribe(genres => this.genres = genres);
  }

  receiveSerie(serie:Serie) {
    this.serieId = serie.id
    this.serieVote = serie.vote_average
    this.moreInfos = true;
  }

}
