import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private ConnexionService: ConnexionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.ConnexionService._utilisateurConnecte.value?.role.nom ==
      'ROLE_ADMINISTRATEUR'
    ) {
      return true;
    }
    return this.router.parseUrl('/droits-insuffisants');
  }
}
