import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  send(message: string): Observable<string> {
    // return this.http.post<{ answer: string }>(this.url, { question: message })
    return of({ answer: 'Olá, tudo bem?' }).pipe(delay(100))
      .pipe(
        catchError(this.handlerError),
        map(({ answer }) => answer),
      );
  }

  handlerError(errorRes: HttpErrorResponse) {
    console.error(errorRes?.error);

    return throwError(() => new Error('Desculpe, não entendi'));
  }

}
