import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { DetailMovieComponent } from './movies/detail-movie/detail-movie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from './movies/pipe/safe.pipe';
import { ConvertHoursPipe } from './movies/pipe/convert-hours.pipe';
import { StyleSpacePipe } from './movies/pipe/style-space.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    DetailMovieComponent,
    SafePipe,
    ConvertHoursPipe,
    StyleSpacePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
