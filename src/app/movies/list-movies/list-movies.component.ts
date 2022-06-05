import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  movies: any;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {

    this.moviesService.getMovies().subscribe(movies => this.movies = movies);
  }
}
