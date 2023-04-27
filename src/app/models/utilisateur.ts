import { Pays } from "./pays";
import { Role } from "./role";

export interface Utilisateur {
  id?: number;
  prenom: string;
  nom: string;
  email: string;
  role: Role;
  //?: pour dire que n'est pas obligatoire
  pays?: Pays;
  createdAt?: Date;
  updatedAt?:Date;
}