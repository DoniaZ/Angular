import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur';
import { PaysService } from 'src/app/services/pays.service';
import { Pays } from 'src/app/models/pays';

@Component({
  selector: 'app-edition-utilisateur',
  templateUrl: './edition-utilisateur.component.html',
  styleUrls: ['./edition-utilisateur.component.scss'],
})
export class EditionUtilisateurComponent {
  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    nom: ['', [Validators.required, Validators.minLength(3)]],
    prenom: ['', [Validators.required]],
    pays: [null, []],
  });
  constructor(
    private formBuilder: FormBuilder,
    //private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private serviceUtilisateur: UtilisateurService,
    private servicePays: PaysService
  ) {}
  //idUtilisateur?:number
  idUtilisateur: number | undefined;
  codeRetour: number = 0;
  messageErreur: String = '';
  //pour récuperer la liste des pays soit avec le  http:HttpClient soit avec une couche service
  listePays: Pays[] = [];
  fichier: File | null = null;

  //le but de ce code qd on clique sur modifier le formulaire est remplie avec les donnees: email, nom, prenm
  ngOnInit() {
    //recupere la liste des pays du serveur
    this.servicePays.getPays().subscribe({
      next: (listePays) => (this.listePays = listePays),
      error: (erreur) => console.log(erreur),
    });

    this.route.params.subscribe((parametres) => {
      this.idUtilisateur = parametres['id'];

      if (this.idUtilisateur != null) {
        this.serviceUtilisateur.getUtilisateur(this.idUtilisateur).subscribe({
          next: (utilisateur: Utilisateur) => {
            this.formulaire.get('email')?.setValue(utilisateur.email);
            this.formulaire.get('nom')?.setValue(utilisateur.nom);
            this.formulaire.get('prenom')?.setValue(utilisateur.prenom);
            this.formulaire.get('pays')?.setValue(utilisateur.pays); //{id:1,nom:'france'}
          },
          error: (erreurRequete) => {
            if (erreurRequete.status === 404) {
              this.codeRetour = 404;
            } else {
              this.codeRetour = 500;
              this.messageErreur = erreurRequete.message;
            }
          },
        });
      }
    });
  }
  onImageSelectionne(evenement: any) {
    this.fichier = evenement.target.files[0];
  }

  comparePays(paysOption: any, paysUtilisateur: any) {
    //la methode compare id par id
    return paysUtilisateur != null && paysUtilisateur.id == paysOption.id;
  }

  //on rajoute l'id pour pouvoir modifier et faire la mise a jour: onrajoute l'id a l'utlisateur
  onSubmit() {
    if (this.formulaire.valid) {
//ajout des photos au backend
const formData = new FormData();

if (this.fichier) {
  formData.append('fichier', this.fichier);
}


  const utilisateur: Utilisateur = this.formulaire.value;
  utilisateur.id = this.idUtilisateur;

formData.append(
  'utilisateur',
  new Blob([JSON.stringify(utilisateur)], {
    type: 'application/json',
  })
);

      this.serviceUtilisateur
        .editionUtilisateur(formData)
        .subscribe((resultat) => this.router.navigateByUrl('accueil'));
    }
  }
}
