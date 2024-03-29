import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './404/page-error/page-error.component';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';
import { DetailMovieComponent } from './movies/detail-movie/detail-movie.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { FavoritesComponent } from './tv/netflix/favorites/favorites.component';
import { NetflixComponent } from './tv/netflix/netflix.component';
import { SeriesTopViewsComponent } from './tv/netflix/series-top-views/series-top-views.component';

const routes: Routes = [
  { path: 'film/:movieId', component: DetailMovieComponent },
  { path: 'film', component: ListMoviesComponent },
  { path: 'netflix/top', component: SeriesTopViewsComponent },
  { path: 'netflix/favoris', component: FavoritesComponent },
  { path: 'netflix', component: NetflixComponent },
  { path: 'error', component: PageErrorComponent },
  { path: '', component: NetflixComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
