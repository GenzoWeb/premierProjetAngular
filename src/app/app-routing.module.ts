import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailMovieComponent } from './movies/detail-movie/detail-movie.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';

const routes: Routes = [
  { path: 'film/:movieId', component: DetailMovieComponent },
  { path: '', component: ListMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
