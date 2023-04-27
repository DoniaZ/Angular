import { Utilisateur } from './models/utilisateur';
import { ConnexionService } from './services/connexion.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //title = 'Test-Angular';
  utilisateurConnecte : Utilisateur | null = null;

  constructor(private ConnexionService: ConnexionService) {}

  ngOnInit(){
    this.ConnexionService._utilisateurConnecte.subscribe(
      
      (utilisateur) =>(this.utilisateurConnecte= utilisateur)
    );
  }


  onDeconnexion() {
    this.ConnexionService.deconnexion();
  }
}
