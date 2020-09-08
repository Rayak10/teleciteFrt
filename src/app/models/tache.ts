import { Userstory } from './userStory';
import { Employe } from './employe';



export class Tache{
    
    
    
    idTache:number;
    descriptionTache:string;
    etatTache:string;
    dureeTache:number;
    dateDebut: Date;
    dateFin : Date;       
    userStory:Userstory=new Userstory();
    employe:Employe=new Employe();


}