import { Utilisateur } from 'src/app/models/utilisateur';
import { ImageService } from './image.service';
import { EditionUtilisateurComponent } from '../pages/edition-utilisateur/edition-utilisateur.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

//@Injectable est comme @service en spring
@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  //creer un observable avec une liste vide ou null par défaut des utilisateurs
  public _utilisateurs: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private ImageService: ImageService) {}
  //creer la méthode getUtisateur qui est refraich utilisateur :fais la mise a jour de l'observable
  public getUtilisateurs() {

    
    this.http
      .get<Utilisateur[]>(environment.serveurUrl +'/utilisateurs')
      .subscribe((utilisateurs: Utilisateur[]) =>{
        for (let utilisateur of utilisateurs) {
          this.ImageService.chargementImageProfil(utilisateur);
      } 
                this._utilisateurs.next(utilisateurs);

  });
}
  

  public deleteUtilisateur(id: number): Observable<any> {
    return this.http.delete('environment.serverUrl + '/admin/utilisateur/' + id);
  }

  public editionUtilisateur(formData: FormData): Observable<any> {
    return this.http.post('environment.serverUrl + '/admin/utilisateur', formData);
  }

  public getUtilisateur(id: number): Observable<any> {
    return this.http.get('environment.serverUrl + '/utilisateur/' + id);
  }
}
