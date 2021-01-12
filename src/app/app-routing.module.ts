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
import { AffectationRessourcesComponent } from './components/affectation-ressources/affectation-ressources.component';
import { AffectationTachesComponent } from './components/affectation-taches/affectation-taches.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';



const routes: Routes = [
 
  {path: '', component: LoginComponent},
  {path: 'gestionComptes', component: GestionComptesComponent},
  {path: 'update/:id', component: EmployeUpdatComponent},
  {path: 'details/:id', component: EmployeDetailleComponent},
  {path: 'gestionProjets', component: GestionProjetComponent},
  {path: 'projets/update/:id',component :ProjetUpdateComponent },
  {path: 'projets/details/:id',component :ProjetDetailleComponent },
  {path: 'gestionSprints',component :GestionSprintsComponent },
  {path: 'sprints/details/:id',component :SprintDetailleComponent },
  {path: 'sprints/update/:id',component :SprintUpdateComponent },
  {path: 'gestionUserstory', component: GestionUserstoryComponent},
  {path: 'userstory/update/:id', component: UserstoryUpdateComponent},
  {path: 'userstory/details/:id',component :UserstoryDetailleComponent},
  {path: 'gestionTaches/:id', component: GestionTacheComponent},
  {path: 'taches/details/:id',component :TacheDetailleComponent },
  {path: 'taches/update/:id',component :TacheUpdateComponent },
  {path: 'gestionReunions', component: GestionReunionComponent},
  {path: 'reunions/details/:id', component: ReunionDetailleComponent},
  {path: 'reunions/update/:id', component: ReunionUpdateComponent},
  {path: 'Reunions/list', component: ListReunionsComponent},
  {path: 'gestionEquipes', component: GestionEquipeComponent},
  {path: 'equipes/details/:id',component :EquipeDetailleComponent },
  {path: 'equipes/update/:id',component :EquipeUpdateComponent },
  {path: 'affectationRessources/:id',component :AffectationRessourcesComponent },
  {path: 'affectationTaches/:id',component :AffectationTachesComponent},
  {path: 'canbanBoeard/:id',component :KanbanBoardComponent},

  


  

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
