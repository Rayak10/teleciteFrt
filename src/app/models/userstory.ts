import { Sprint } from './sprint';


export class Userstory{
    
    
    
        idUserStory:number;
        libelleUserStory:string;
        priorite:number;
        complexite:number;
        etat:String;
        sprint: Sprint = new Sprint();
             }