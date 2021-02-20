import { Bureau } from './bureau';
import { Departement } from './departement';
import { Equipe } from './equipe';
import { Reunion } from './Reunion';
import { RoleMember } from './roleMember';

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
	active:boolean;
	photo:any;
	 fileName:string;
	isChecked:boolean;
	bureau: Bureau=new Bureau();
	role: RoleMember=new RoleMember();
	token: string = '';
	departement: Departement=new Departement();
	equipe: Equipe=new Equipe();
	reunions: Reunion[] = [];
}