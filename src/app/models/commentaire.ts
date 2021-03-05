import { Employe } from "./employe";
import { Sprint } from "./sprint";

export class Commentaire{
      idCommentaire:number;
	  libelleCommentaire:String;
	  dateCommentaire:Date = new Date();
      employe:Employe=new Employe();
      sprint:Sprint=new Sprint();
      
}