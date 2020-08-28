import { Bureau } from './bureau';
import { Departement } from './departement';
import { Equipe } from './equipe';

export class Employe{
    idEmploye: number;
    matricule: string;
	nomEmploye:string;
	prenomEmploye:string;
    dateNaissance:Date= new Date();
    email:string;
	password:string;
	dateEmbauche:Date = new Date();
	salaire:number;
	post:string;
	role:string;
	active:boolean;
	bureau: Bureau=new Bureau();
	departement: Departement=new Departement();
	equipe: Equipe=new Equipe();
}