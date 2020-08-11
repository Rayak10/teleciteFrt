import { Bureau } from './bureau';
import { Departement } from './departement';

export class Employe{
    idEmploye: number;
    matricule: string;
	nomEmploye:string;
	prenomEmploye:string;
    dateNaissance:Date;
    email:string;
	password:string;
	dateEmbauche:Date;
	salaire:number;
	post:string;
	role:string;
	active:boolean;
	bureau: Bureau=new Bureau();
	departement: Departement=new Departement();
}