import { Time } from '@angular/common';
import { Equipe } from './equipe';

export class Reunion{
    idReunion: number;
    nomReunion: string;
	descriptionReunion: string;
    dateDebut:Date= new Date();
    dateFin:Date= new Date();
    heureDeb:Time;
    heureFin:Time;
    notification:Notification;
    equipe:Equipe;
    type:Type;
}
    enum Type {
        ReunionScrum,
         ReunionAdministrati
    }