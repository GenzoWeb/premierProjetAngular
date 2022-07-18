import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { DetailMovieComponent } from './movies/detail-movie/detail-movie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NetflixComponent } from './tv/netflix/netflix.component';
import { NetflixNavbarComponent } from './tv/netflix-navbar/netflix-navbar.component';
import { MoviesNavbarComponent } from './movies/movies-navbar/movies-navbar.component';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';
import { BackgroundNavbarDirective } from './tv/background-navbar.directive';
import { SafePipe } from './pipe/safe.pipe';
import { ConvertHoursPipe } from './pipe/convert-hours.pipe';
import { StyleSpacePipe } from './pipe/style-space.pipe';
import { TruncateTextPipe } from './pipe/truncate-text.pipe';
import { InfosSerieComponent } from './tv/netflix/infos-serie/infos-serie.component';
import { FormsModule } from '@angular/forms';
import { SeriesByGenresComponent } from './tv/netflix/series-by-genres/series-by-genres.component';
import { EffectZoomImgDirective } from './tv/effect-zoom-img.directive';
import { NextDirective } from './tv/next.directive';
import { PrevDirective } from './tv/prev.directive';
import { SliderDirective } from './tv/slider.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    DetailMovieComponent,
    NetflixComponent,
    NetflixNavbarComponent,
    SafePipe,
    ConvertHoursPipe,
    StyleSpacePipe,
    MoviesNavbarComponent,
    PageNotFoundComponent,
    BackgroundNavbarDirective,
    TruncateTextPipe,
    InfosSerieComponent,
    SeriesByGenresComponent,
    EffectZoomImgDirective,
    NextDirective,
    PrevDirective,
    SliderDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
