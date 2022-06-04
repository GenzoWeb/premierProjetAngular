import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<any>(this.getUrl('now_playing')).pipe(
      map(response => response = response.results),
      tap((response) => this.log(response)),
      catchError(async (error) => this.handleError(error))
    )
  }

  getMovieById(id:number): Observable<any> {
    console.log(id, 'coucou')
    return this.http.get<any>(this.getUrl(id)).pipe(
      tap((response) => this.log(response)),
      catchError(async (error) => this.handleError(error))
    )
  }

  private getUrl(param: string | number) {
    const APIKey: string = environment.APIKey;
    return `https://api.themoviedb.org/3/movie/${param}?api_key=${APIKey}&language=fr-FR`;
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error) {
    console.error(error);
  }
}
