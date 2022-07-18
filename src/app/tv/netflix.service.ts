import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actors } from '../movies/interface/actors';
import { SerieDescription } from './interface/serie-description';
import { GenreTv, Serie, Series } from './interface/series';

@Injectable({
  providedIn: 'root'
})
export class NetflixService {

  APIKey: string = environment.APIKey;

  constructor(private http: HttpClient) { }

  getSeries(): Observable<Serie> {
    return this.http.get<Series>(`https://api.themoviedb.org/3/tv/popular?api_key=${this.APIKey}&language=fr-FR`).pipe(
      map(series => series.results),
      map(series => series.filter((serie:Serie) => serie.backdrop_path !== null)),
      map(series => series[Math.abs((Math.floor(Math.random() * series.length - 1)))]),
      tap((response) => this.log(response))
    )
  }

  getSeriesById(serieId: number): Observable<SerieDescription> {
    return this.http.get<SerieDescription>(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${this.APIKey}&language=fr-FR`).pipe(
      tap((response) => this.log(response))
    )
  }
  
  getActorsbySerie(id:number): Observable<Actors> {
    return this.http.get<Actors>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.APIKey}&language=fr-FR`).pipe(
      tap((response) => this.log(response))
    )
  }

  getListEpisodes(id:number,season:number) {
    return this.http.get<Actors>(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${this.APIKey}&language=fr-FR`).pipe(
      tap((response) => this.log(response))
    )
  }

  getGenresListTv(): Observable<GenreTv[]> {
    return this.http.get<Serie>(`https://api.themoviedb.org/3/genre/tv/list?api_key=${this.APIKey}&language=fr-FR`).pipe(
      map(series => series.genres),
      tap((response) => this.log(response))
    )
  }

  getSeriesByGenres(id:number): Observable<Serie[]> {
    return this.http.get<Series>(`https://api.themoviedb.org/3/discover/tv?api_key=${this.APIKey}&with_genres=${id}&language=fr-FR`).pipe(
      map(series => series.results),
      tap((response) => this.log(response))
    )
  }

  private log(response: any) {
    console.table(response);
  }
}
