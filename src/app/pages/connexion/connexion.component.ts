import { ConnexionService } from './../../services/connexion.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private ConnexionService : ConnexionService,
    private router: Router
  ) {}
  erreurLogin = false;

  onSubmit(): void {
    if (this.formulaire.valid) {
      this.ConnexionService.connexion( this.formulaire.value)
       .subscribe({
        next: (jwt) => {
          //mettre l'utilisateur ds le local storage
          localStorage.setItem('jwt', jwt);
          this.ConnexionService.updateUserConnected();


          this.router.navigateByUrl('/accueil');
        },
        error: (erreur) => {
          this.erreurLogin = true;
        },
      });
    }
  }
}
