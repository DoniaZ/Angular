import { EditionUtilisateurComponent } from '../pages/edition-utilisateur/edition-utilisateur.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

//@Injectable est comme @service en spring
@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  //creer un observable avec une liste vide ou null par défaut des utilisateurs
  public _utilisateurs: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}
  //creer la méthode getUtisateur qui est refraich utilisateur :fais la mise a jour de l'observable
  public getUtilisateurs() {

    
    this.http
      .get('http://localhost:8081/utilisateurs')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }

  public deleteUtilisateur(id: number): Observable<any> {
    return this.http.delete('http://localhost:8081/admin/utilisateur/' + id);
  }

  public editionUtilisateur(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/admin/utilisateur', formData);
  }

  public getUtilisateur(id: number): Observable<any> {
    return this.http.get('http://localhost:8081/utilisateur/' + id);
  }
}
