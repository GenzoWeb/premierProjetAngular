import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/movies/interface/actors';
import { SerieDescription } from '../../interface/serie-description';
import { NetflixService } from '../../netflix.service';

@Component({
  selector: 'app-infos-serie',
  templateUrl: './infos-serie.component.html',
  styleUrls: ['./infos-serie.component.css']
})
export class InfosSerieComponent implements OnInit {
  @Input() serieId!: number;
  @Input() serieVote?: number;

  serie?: SerieDescription;
  actors?: Cast[];
  urlBaseImage: string = "https://image.tmdb.org/t/p/w500";
  urlBaseImageSeason: string = "https://image.tmdb.org/t/p/w92";
  urlTestImage: string = "assets/images/cinema.jpg";
  selected!: number;
  nameSeason!: string;
  collapsed:boolean = true;
  episode?: any;
  urlBaseImageEpisode: string = "https://image.tmdb.org/t/p/w185";
  listEpisodes: boolean = false;
  status: boolean = false;

  constructor(private netflixService: NetflixService) { }

  ngOnInit() {
    this.netflixService.getSeriesById(this.serieId).subscribe(serie => {
      this.serie = serie;
      this.selected = serie.seasons[0].season_number;
      this.episode = this.changeSelect(serie.seasons[0].season_number)
    });
    this.netflixService.getActorsbySerie(this.serieId).subscribe(actors => this.actors = actors.cast);
  }

  changeSelect(selected:number) {
    this.netflixService.getListEpisodes(this.serieId,selected).subscribe(episodes => this.episode = episodes);
  }

  rotateDropdown() {
    this.status = !this.status;
  }

}
