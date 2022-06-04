import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {

  movie: any;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) { }

  ngOnInit() {

    const movieId: number = Number(this.route.snapshot.paramMap.get('movieId'));
    this.moviesService.getMovieById(movieId).subscribe(movie => this.movie = movie);
  }

}
