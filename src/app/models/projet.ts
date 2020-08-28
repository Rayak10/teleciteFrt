import { Equipe } from './equipe';

export class Projet{
    
idProjet:number;
nomProjet:string;
theme:string;
description:string ;
descriptionTechnique:string;
dateDebut:Date=new Date();
dateFin :Date = new Date();
equipe: Equipe=new Equipe();



}