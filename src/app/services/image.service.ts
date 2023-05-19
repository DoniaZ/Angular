import { Utilisateur } from 'src/app/models/utilisateur';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient, private sanitizer :DomSanitizer) { }

  chargementImageProfil(utilisateur: Utilisateur){
    console.log(utilisateur);
  if (utilisateur.nomImageProfil !=null){
  this.http
     .get(environment.serverUrl + '/image-profil/' + utilisateur.id, {
          responseType: 'blob',
        })
        .subscribe((donneeImage: any) => {
          utilisateur.imageProfil = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(donneeImage)
          );
        });
    }
  }



  }

