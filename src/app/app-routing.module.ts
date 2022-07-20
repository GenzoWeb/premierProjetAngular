import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';
import { DetailMovieComponent } from './movies/detail-movie/detail-movie.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { NetflixComponent } from './tv/netflix/netflix.component';
import { SeriesTopViewsComponent } from './tv/netflix/series-top-views/series-top-views.component';

const routes: Routes = [
  { path: 'film/:movieId', component: DetailMovieComponent },
  { path: 'netflix/top', component: SeriesTopViewsComponent },
  { path: 'netflix', component: NetflixComponent },
  { path: '', component: ListMoviesComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
