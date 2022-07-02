import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Actors } from './interface/actors';
import { Movie } from './interface/movie';
import { MoviesList } from './interface/movies-list';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  APIKey: string = environment.APIKey;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    const startDate: string = this.dateSet(true);
    const endDate: string = this.dateSet();

    return this.http.get<MoviesList>(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.APIKey}&primary_release_date.gte=${startDate}-20&primary_release_date.lte=${endDate}-25&language=fr-FR`).pipe(
      map(movies => movies.results.sort((a:any,b:any) => 
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime())),
      tap((response) => this.log(response))
    )
  }

  getMovieById(id:number): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.APIKey}&language=fr-FR`).pipe(
      tap((response) => this.log(response))
    )
  }

  getGenresList(): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.APIKey}&language=fr-FR`).pipe(
      tap((response) => this.log(response))
    )
  }

  getActorsbyMovie(id:number): Observable<Actors> {
    return this.http.get<Actors>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.APIKey}&language=fr-FR`).pipe(
      tap((response) => this.log(response))
    )
  }

  getVideosMovie(id:number): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.APIKey}&language=fr-FR`).pipe(
      tap((response) => this.log(response))
    )
  }

  private dateSet(param:boolean = false): string {
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

  private previousMonth(month:number): number {
    let prevMonth: number = month - 1;
    if (prevMonth == 0) {
      prevMonth = 12
    }
    return prevMonth
  }

  private nextMonth(month:number): number {
    let next: number = month + 1;
    if (next == 13) {
      next = 1
    }
    return next
  }

  private log(response: any) {
    console.log(response);
  }
}
