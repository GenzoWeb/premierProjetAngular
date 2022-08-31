import { Component, OnInit } from '@angular/core';
import { Genre, Movie } from '../interface/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  movies?: Movie[];
  genresTest?: Genre[];
  urlBaseImage: string = "https://image.tmdb.org/t/p/w500";
  urlTestImage: string = "/projet9/assets/images/cinema.jpg";
  documentary: number = 0;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies)
    
    this.moviesService.getGenresList().subscribe(movies =>  {
      this.genresTest = movies.genres;
      movies.genres.forEach(genre => {
        if(genre.name == 'Documentaire') {
          this.documentary = genre.id;
        }
      });
    });
  }
}
