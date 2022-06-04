import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  // movies: ConfigMovies | undefined;
  movies: any;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    // this.list = this.moviesService.getMovies()
    // .subscribe(movies => this.movies = movies);

    // this.moviesService.getMovies().pipe(
    //   map(res => res = res.results)
    // )
    // .subscribe(movies => this.movies = movies);

    this.moviesService.getMovies().subscribe(movies => this.movies = movies);
  }



  

  // showConfigResponse() {
  //   this.moviesService.getList()
  //     // resp is of type `HttpResponse<Config>`
  //     // .subscribe(resp => {
  //     //   // display its headers
  //     //   const keys = resp.headers.keys();
  //     //   this.headers = keys.map(key =>
  //     //     `${key}: ${resp.headers.get(key)}`);
  
  //     //   // access the body directly, which is typed as `Config`.
  //     //   return this.movies = { ...resp.body! };
  //     // });
  //     .subscribe(resp => { console.log(resp)});
  // }
  
}
