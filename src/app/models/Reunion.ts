import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Employe } from './employe';
import { Equipe } from './equipe';
import { TypeReunion } from './typeReunion';

export class Reunion{
    idReunion: number;
    nomReunion: string;
	descriptionReunion: string;
    dateDebut:Date= new Date();
    dateFin:Date= new Date();
    heureDeb:NgbTimeStruct ;
    heureFin:NgbTimeStruct;
    heurDeb: string;
    heurFin: string;
    notification:Notification;
    equipe:Equipe;
    type:TypeReunion;
    employes:number[];
}


