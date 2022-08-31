import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Actors } from './interface/actors';
import { Movie } from './interface/movie';
import { MoviesList } from './interface/movies-list';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  APIKey: string = environment.APIKey;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getMovies(): Observable<Movie[]> {
    const startDate: string = this.dateSet(true);
    const endDate: string = this.dateSet();

    return this.http.get<MoviesList>(`https://api.themoviedb.org/3/movie/popular?api_key=${this.APIKey}&primary_release_date.gte=${startDate}-20&primary_release_date.lte=${endDate}-25&language=fr-FR`).pipe(
      map(movies => movies.results.sort((a:any,b:any) => 
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime())),
      catchError(() => { return this.errorCatch() })
    )
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.APIKey}&language=fr-FR`).pipe(
      catchError(() => { return this.errorCatch() })
    )
  }

  getGenresList(): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.APIKey}&language=fr-FR`).pipe(
      catchError(() => { return this.errorCatch() })
    )
  }

  getActorsbyMovie(id: number): Observable<Actors> {
    return this.http.get<Actors>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.APIKey}&language=fr-FR`).pipe(
      catchError(() => { return this.errorCatch() })
    )
  }

  getVideosMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.APIKey}&language=fr-FR`).pipe(
      catchError(() => { return this.errorCatch() })
    )
  }

  private dateSet(param: boolean = false): string {
    let month: number = new Date().getMonth() + 1;
    let year: number = new Date().getFullYear();

    if (param) {
      month = this.previousMonth(month);
      if (month == 12) {
        year -= 1
      }
    } else {
      month = this.nextMonth(month);
      if (month == 1) {
        year += 1
      }
    }
    
    let monthFinal: string = month.toString();
    
    if (month < 10){
      monthFinal = "0" + monthFinal
    }

    const end: string = year + "-" + monthFinal;

    return end;
  }

  private previousMonth(month: number): number {
    let prevMonth: number = month - 1;
    if (prevMonth == 0) {
      prevMonth = 12
    }
    return prevMonth
  }

  private nextMonth(month: number): number {
    let next: number = month + 1;
    if (next == 13) {
      next = 1
    }
    return next
  }

  private errorCatch() {
    this.router.navigateByUrl("/error");
    return [];
  }
}
