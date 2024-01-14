import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  url = 'https://1e7d-177-37-196-70.ngrok-free.app/questions';

  constructor(private http: HttpClient) {}

  send(message: string): Observable<{ answer: string }> {
    // return this.http.post<{ answer: string }>(this.url, { question: message });
    return of({ answer: 'Olá, tudo bem?' }).pipe(delay(100));
  }

  // TODO: Tratamento de exceções
}
