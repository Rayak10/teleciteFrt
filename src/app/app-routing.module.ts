import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from '../app/components/login/login.component';
import { GestionComptesComponent } from '../app/components/gestion-comptes/gestion-comptes.component';
import { EmployeUpdatComponent } from './components/employe-updat/employe-updat.component';
import { EmployeDetailleComponent } from './components/employe-detaille/employe-detaille.component';
import { GestionProjetComponent } from './components/gestion-projet/gestion-projet.component';
import { ProjetUpdateComponent } from './components/projet-update/projet-update.component';
import { ProjetDetailleComponent } from './components/projet-detaille/projet-detaille.component';
import { GestionSprintsComponent } from './components/gestion-sprints/gestion-sprints.component';
import { SprintDetailleComponent } from './components/sprint-detaille/sprint-detaille.component';
import { SprintUpdateComponent } from './components/sprint-update/sprint-update.component';
import { GestionUserstoryComponent } from './components/gestion-userstory/gestion-userstory.component';
import { UserstoryUpdateComponent } from './components/userstory-update/userstory-update.component';
import { UserstoryDetailleComponent } from './components/userstory-detaille/userstory-detaille.component';
import { GestionTacheComponent } from './components/gestion-tache/gestion-tache.component';
import { TacheDetailleComponent } from './components/tache-detaille/tache-detaille.component';
import { TacheUpdateComponent } from './components/tache-update/tache-update.component';
import { GestionReunionComponent } from './components/gestion-reunion/gestion-reunion.component';
import { ReunionDetailleComponent } from './components/reunion-detaille/reunion-detaille.component';
import { ListReunionsComponent } from './components/list-reunions/list-reunions.component';
import { ReunionUpdateComponent } from './components/reunion-update/reunion-update.component';
import { GestionEquipeComponent } from './components/gestion-equipe/gestion-equipe.component';
import { EquipeDetailleComponent } from './components/equipe-detaille/equipe-detaille.component';
import { EquipeUpdateComponent } from './components/equipe-update/equipe-update.component';
import { AjoutProjetComponent } from './components/ajout-projet/ajout-projet.component';

import { AffectationRessourcesComponent } from './components/affectation-ressources/affectation-ressources.component';
import { AffectationTachesComponent } from './components/affectation-taches/affectation-taches.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { BurndownchartComponent } from './components/burndownchart/burndownchart.component';
import { AuthGuardService as AuthGuard} from './services/jwt/auth-guard.service';
import { 
  RoleGuardService as RoleGuard 
} from './services/jwt/role-guard.service';
import { AjoutSprintComponent } from './components/ajout-sprint/ajout-sprint.component';
import { AjoutcommentaireComponent } from './components/ajoutcommentaire/ajoutcommentaire.component';
import { UpdateCommentaireComponent } from './components/update-commentaire/update-commentaire.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UpdatePWDComponent } from './components/update-pwd/update-pwd.component';
import { ValidationSprintComponent } from './components/validation-sprint/validation-sprint.component';

const routes: Routes = [
 
  {path: '', component: LoginComponent},
  {path: 'gestionComptes', component: GestionComptesComponent, canActivate: [RoleGuard], data: { 
    expectedRole: 'ROLE_DRH,ROLE_SCRUM_MASTER'
  } },
  {path: 'update/:id', component: EmployeUpdatComponent, canActivate: [RoleGuard], data: { 
    expectedRole: 'ROLE_DRH,ROLE_SCRUM_MASTER'
  } },
  {path: 'updatepwd/:id', component: UpdatePWDComponent, canActivate: [RoleGuard], data: { 
    expectedRole: 'ROLE_DRH'
  } },
  {path: 'details/:id', component: EmployeDetailleComponent, canActivate: [RoleGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_DRH,ROLE_PRODUCT_OWNER,ROLE_EMPLOYE,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: 'gestionProjets', component: GestionProjetComponent, canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER'
  } },
  {path: 'projets/update/:id',component :ProjetUpdateComponent, canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER'
  } },
  {path: 'projets/details/:id',component :ProjetDetailleComponent, canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: 'gestionSprints',component :GestionSprintsComponent, canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: 'sprints/details/:id',component :SprintDetailleComponent, canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: 'sprints/update/:id',component :SprintUpdateComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER'
  } },
  {path: 'gestionUserstory', component: GestionUserstoryComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER'
  } },
  {path: 'userstory/update/:id', component: UserstoryUpdateComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER'
  } },
  {path: 'userstory/details/:id',component :UserstoryDetailleComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER'
  } },
  {path: 'gestionTaches/:id', component: GestionTacheComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER'
  } },
  {path: 'taches/details/:id',component :TacheDetailleComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER'
  } },
  {path: 'taches/update/:id',component :TacheUpdateComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER'
  } },
  {path: 'gestionReunions', component: GestionReunionComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_DRH,ROLE_PRODUCT_OWNER,ROLE_EMPLOYE,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER,ROLE_EMPLOYE'
  } },
  {path: 'reunions/details/:id', component: ReunionDetailleComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_DRH,ROLE_PRODUCT_OWNER,ROLE_EMPLOYE,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER,ROLE_EMPLOYE'
  } },
  {path: 'reunions/update/:id', component: ReunionUpdateComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_DRH,ROLE_PRODUCT_OWNER,ROLE_EMPLOYE,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER,ROLE_EMPLOYE'
  } },
  {path: 'Reunions/list', component: ListReunionsComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_DRH,ROLE_PRODUCT_OWNER,ROLE_EMPLOYE,ROLE_SCRUM_TEAM_MEMBER,ROLE_DEV_TEAM_MEMBER,ROLE_EMPLOYE'
  } },
  {path: 'gestionEquipes', component: GestionEquipeComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER'
  } },
  {path: 'equipes/details/:id',component :EquipeDetailleComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER'
  } },
  {path: 'equipes/update/:id',component :EquipeUpdateComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER'
  } },
  {path: 'affectationRessources/:id',component :AffectationRessourcesComponent,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: 'KanbanBoard/:id1/:id2',component :KanbanBoardComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: 'burndownchart/:id',component :BurndownchartComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: 'ajoutProjet',component :AjoutProjetComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER'
  } },
  {path: 'ajoutSprint',component :AjoutSprintComponent ,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_PRODUCT_OWNER'
  } },
  
  {path: 'ajoutCommentaire',component :AjoutcommentaireComponent,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: 'commentaire/update',component :UpdateCommentaireComponent,canActivate: [AuthGuard], data: { 
    expectedRole: 'ROLE_SCRUM_MASTER,ROLE_PRODUCT_OWNER,ROLE_SCRUM_TEAM_MEMBER'
  } },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
   
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
