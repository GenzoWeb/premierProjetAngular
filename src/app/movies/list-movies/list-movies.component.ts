import { Component, OnInit } from '@angular/core';
import { Movie } from '../interface/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  movies: Movie[] | undefined;
  urlBaseImage: string = "https://image.tmdb.org/t/p/w500";
  urlTestImage: string = "assets/images/cinema.jpg";

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies.results.sort((a:any,b:any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()))
  }
}
