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

  constructor(private netflixService: NetflixService) { }

  ngOnInit() {
    this.netflixService.getSeries().subscribe(serie => this.serie = serie)
  }

}
