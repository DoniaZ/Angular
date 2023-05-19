import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pays } from '../models/pays';

@Injectable({
  providedIn: 'root',
})
export class PaysService {
  constructor(private http: HttpClient) {}

  public getPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>('environment.serverUrl + '/liste-pays');
  }
}
