import { Time } from '@angular/common';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Equipe } from './equipe';
import { TypeReunion } from './typeReunion';

export class Reunion{
    idReunion: number;
    nomReunion: string;
	descriptionReunion: string;
    dateDebut:Date= new Date();
    dateFin:Date= new Date();
    heureDeb:NgbTimeStruct;
    heureFin:NgbTimeStruct;
    notification:Notification;
    equipe:Equipe;
    type:TypeReunion;
}


