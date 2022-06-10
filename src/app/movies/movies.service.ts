import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Movie } from './interface/movie';
import { ResultApi } from './interface/result-api';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  APIKey: string = environment.APIKey;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<ResultApi> {
    const startDate: string = this.dateSet(true);
    const endDate: string = this.dateSet();

    return this.http.get<ResultApi>(`https://api.themoviedb.org/3/discover/movie?api_key=${this.APIKey}&primary_release_date.gte=${startDate}-01&primary_release_date.lte=${endDate}-25&language=fr-FR`).pipe(tap((response) => this.log(response.results)))
  }

  getMovieById(id:number): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.APIKey}&language=fr-FR`).pipe(tap((response) => this.log(response)))
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
    console.table(response);
  }
}
