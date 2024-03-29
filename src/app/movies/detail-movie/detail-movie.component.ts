import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cast } from '../interface/actors';
import { Movie } from '../interface/movie';
import { MovieClip } from '../interface/movie-clip';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {

  movie?:  Movie;
  actors?:  Cast[];
  videos?:  MovieClip[];
  urlBaseImage: string = "https://image.tmdb.org/t/p/w500";
  urlTestImage: string = "/projet9/assets/images/cinema.jpg";
  urlBaseVideo: string = "https://www.youtube.com/embed/";

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    const movieId: number = Number(this.route.snapshot.paramMap.get('movieId'));
    this.moviesService.getMovieById(movieId).subscribe(movie => this.movie = movie);
    this.moviesService.getActorsbyMovie(movieId).subscribe(movie => this.actors = movie.cast);
    this.moviesService.getVideosMovie(movieId).subscribe(movie => this.videos = movie.results);
  }

}