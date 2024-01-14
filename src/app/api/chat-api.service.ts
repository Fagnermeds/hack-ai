import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  url = 'https://1e7d-177-37-196-70.ngrok-free.app/questions';

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

  // return of({ answer: 'Olá, tudo bem?' }).pipe(delay(100));
}
