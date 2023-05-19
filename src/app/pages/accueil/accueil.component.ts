import { ConnexionService } from './../../services/connexion.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  listeUtilisateur: Utilisateur[] = [];
  //utilisateurConnecte: Utilisateur | null = null;
  isAdmin: boolean = false;
  dateMaintenant: Date = new Date();

  //constructor:injection de dependance en angular est par constructeur: va affecter une instance de httpClient dans http
  constructor(
    //private http: HttpClient,
    private serviceUtilisateur: UtilisateurService,
    private ConnexionService: ConnexionService
  ) {}

  //des qui'il ya .next utilisateurs => this.listeUtilisateur= utilisateurs sera executé
  ngOnInit() {
    this.serviceUtilisateur._utilisateurs.subscribe(
      (utilisateurs) => (this.listeUtilisateur = utilisateurs)
    );

    this.ConnexionService._utilisateurConnecte.subscribe(
      (utilisateur) =>
        (this.isAdmin = utilisateur?.role.nom == 'ROLE_ADMINISTRATEUR')


        
        
    );

    //on appel la methode raffraichir()
    this.raffraichir();
  }

  raffraichir(): void {
    this.serviceUtilisateur.getUtilisateurs();
  }

  onDeleteUser(idUtilisateur: number | undefined) {
    if (idUtilisateur != undefined) {
      this.serviceUtilisateur
        .deleteUtilisateur(idUtilisateur)
        .subscribe((utilisateur) => this.raffraichir());
    }
  }
}
