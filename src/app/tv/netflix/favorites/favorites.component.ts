import { Component, OnInit } from '@angular/core';
import { Serie } from '../../interface/series';
import { NetflixService } from '../../netflix.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites?: Serie[];
  urlBaseImage: string = "https://image.tmdb.org/t/p/w92";
  moreInfos: boolean = false;
  serieId!: number;
  serieVote?: number;
  serieName!: string;
  widthImage: boolean = true;
  toggleInfos?: boolean;

  constructor(private netflixServiec: NetflixService) { }

  ngOnInit() {
    this.favorites = this.netflixServiec.getFavorites();
  }

  deleteFavorite(index: number) {
    this.netflixServiec.deleteSerie(index);
  }

  serieInfos(serie: Serie) {
    this.moreInfos = true;
    this.serieId = serie.id;
    this.serieVote = serie.vote_average;
    this.serieName = serie.name;
  }

  receiveToggleInfos(bool: boolean) {
    this.toggleInfos = bool;
  }
}