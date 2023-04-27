import { Utilisateur } from 'src/app/models/utilisateur';
import { VariableBinding } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(utilisateur: Utilisateur, ...args: string[]): string {
    return utilisateur.prenom + ' ' + utilisateur.nom.toUpperCase();
  }
}
