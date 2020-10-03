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
    heureDeb:NgbTimeStruct = {hour: 0, minute: 0,second:0};
    heureFin:NgbTimeStruct= {hour: 0, minute: 0,second:0};
    notification:Notification;
    equipe:Equipe;
    type:TypeReunion;
    employes:number[];
}


