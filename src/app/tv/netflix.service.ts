import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actors } from '../movies/interface/actors';
import { SerieDescription } from './interface/serie-description';
import { GenreTv, Serie, Series } from './interface/series';

@Injectable({
  providedIn: 'root'
})
export class NetflixService {

  APIKey: string = environment.APIKey;
  favorites: Serie[] = [];
  displayed : boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getSerieRandom(): Observable<Serie> {
    return this.http.get<Series>(`https://api.themoviedb.org/3/tv/popular?api_key=${this.APIKey}&language=fr-FR`).pipe(
      map(series => series.results),
      map(series => series.filter((serie:Serie) => serie.backdrop_path !== null)),
      map(series => series[Math.abs((Math.floor(Math.random() * series.length - 1)))]),
      catchError(() => { return this.errorCatch() })
    )
  }

  getSeriesById(serieId: number): Observable<SerieDescription> {
    return this.http.get<SerieDescription>(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${this.APIKey}&language=fr-FR`).pipe(
      catchError(() => { return this.errorCatch() })
    )
  }
  
  getActorsbySerie(id: number): Observable<Actors> {
    return this.http.get<Actors>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.APIKey}&language=fr-FR`).pipe(
      catchError(() => { return this.errorCatch() })
    )
  }

  getListEpisodes(id: number, season:number) {
    return this.http.get<Serie>(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${this.APIKey}&language=fr-FR`).pipe(
      catchError(() => { return this.errorCatch() })
    )
  }

  getGenresListTv(): Observable<GenreTv[]> {
    return this.http.get<Serie>(`https://api.themoviedb.org/3/genre/tv/list?api_key=${this.APIKey}&language=fr-FR`).pipe(
      map(series => series.genres),
      catchError(() => { return this.errorCatch() })
    )
  }

  listDisplayed() {
    this.displayed = true;
  }

  getDisplayed(): boolean {
    return this.displayed;
  }

  getSeriesByGenres(id: number): Observable<Serie[]> {
    return this.http.get<Series>(`https://api.themoviedb.org/3/discover/tv?api_key=${this.APIKey}&with_genres=${id}&language=fr-FR`).pipe(
      map(series => series.results),
      catchError(() => { return this.errorCatch() })
    )
  }

  getSeriesTop(): Observable<Serie[]> {
    return this.http.get<Series>(`https://api.themoviedb.org/3/tv/top_rated?api_key=${this.APIKey}&language=fr-FR`).pipe(
      map(series => series.results),
      catchError(() => { return this.errorCatch() })
    )
  }
  
  addSerie(serie: Serie): boolean {
    const testFavorites: boolean = this.favoriteExist(serie.id);
    
    if(testFavorites) {
      const index: number = this.favorites.findIndex(s => s.id == serie.id);
      this.deleteSerie(index);
      return false;
    } else {
      this.favorites.push(serie);
      return true;
    }
  }

  deleteSerie(index: number) {
    this.favorites.splice(index,1);
  }

  favoriteExist(id: number): boolean {
    const index: number = this.favorites.findIndex(s => s.id == id);
    if(index === -1) {
      return false;
    } else {
      return true;
    }
  }

  getFavorites(): Serie[] {
    return this.favorites;
  }

  seriesSearchList(searchTerm: string): Observable<Serie[]> {
    if(searchTerm.length <= 2) {
      return of([]);
    }
    return this.http.get<Series>(`https://api.themoviedb.org/3/search/tv?api_key=c0d32ef41d1fec3b847544ebe1ec414c&language=fr-FR&query=${searchTerm}`).pipe(
      map(series => series.results),
      catchError(() => { return this.errorCatch() })
    )
  }

  private errorCatch() {
    this.router.navigateByUrl("/error");
    return [];
  }
}
