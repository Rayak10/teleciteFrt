import { Projet } from './projet';

export class Sprint{
    
    
    
        idSprint:number;
        nomSprint:string;
        numeroSprint:number;
        dateDebut:Date=new Date();
        dateFin:Date=new Date();
        etatSprint:string;
        descriptionSprint:string;
        projet: Projet=new Projet();
        }