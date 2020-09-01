import { Equipe } from './equipe';
import { Observable } from 'rxjs';
import { Sprint } from './sprint';

export class Projet{
    
idProjet:number;
nomProjet:string;
theme:string;
description:string ;
descriptionTechnique:string;
dateDebut:Date=new Date();
dateFin :Date = new Date();
equipe: Equipe=new Equipe();
sprints:Sprint[];

}