//import { Utilisateur } from './../models/utilisateur';
import { Utilisateur } from 'src/app/models/utilisateur';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  //voir si un utilisateur est connecté ou pas, BehaviorSubject<Utilisateur | null>(null)cadire ca valeur initial est null
  public _utilisateurConnecte: BehaviorSubject<Utilisateur | null> =
    new BehaviorSubject<Utilisateur | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    
  }

  connexion(utilisateur: Utilisateur): Observable<string> {
    return this.http.post('environment.serverUrl + '/connexion', utilisateur, {
      responseType: 'text',
    });
  }

  updateUserConnected() {
    const jwt = localStorage.getItem('jwt');
    if (jwt != null) {
      //extraire le subject de jwt
      const data = jwt.split('.')[1];
      const json = window.atob(data);
      const donneesUtilisateur = JSON.parse(json);

      //const listeRole = donneesUtilisateur.roles.split(',').filter((role : string) => nomRole)
      const utilisateur: Utilisateur = {
        
        email: donneesUtilisateur.sub,
        nom: donneesUtilisateur.nom,
        prenom: donneesUtilisateur.prenom,
        //roles: donneesUtilisateur.roles;
        role: { nom: donneesUtilisateur.role },
      };
      this._utilisateurConnecte.next(utilisateur);
    } else {
      this._utilisateurConnecte.next(null);
    }
  }

  deconnexion() {
    localStorage.removeItem('jwt');
    this._utilisateurConnecte.next(null);
    this.router.navigateByUrl('/connexion');
  }
}
