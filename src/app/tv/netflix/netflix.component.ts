import { Component, OnInit } from '@angular/core';
import { Serie } from '../interface/series';
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
  favorite: boolean = true;
  toggleInfos?: boolean;

  constructor(private netflixService: NetflixService) { }

  ngOnInit() {
    this.netflixService.getSerieRandom().subscribe(serie => {
      this.serie = serie;
      this.favorite = this.netflixService.favoriteExist(serie.id)
    });
    this.netflixService.getGenresListTv().subscribe(genres => this.genres = genres);
  }

  receiveSerie(serie:Serie) {
    this.serieId = serie.id
    this.serieVote = serie.vote_average
    this.moreInfos = true;
  }

  addFavorites(serie:any) {
    this.favorite = this.netflixService.addSerie(serie);
  } 

  receiveToggleInfos(bool: boolean) {
    this.toggleInfos = bool;
  }
}
