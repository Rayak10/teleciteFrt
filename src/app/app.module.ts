import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionComptesComponent } from './components/gestion-comptes/gestion-comptes.component';
import { EmployeDetailleComponent } from './components/employe-detaille/employe-detaille.component';
import { EmployeUpdatComponent } from './components/employe-updat/employe-updat.component';
import { GestionProjetComponent } from './components/gestion-projet/gestion-projet.component';
import { ProjetUpdateComponent } from './components/projet-update/projet-update.component';
import { ProjetDetailleComponent } from './components/projet-detaille/projet-detaille.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ReunionUpdateComponent } from './components/reunion-update/reunion-update.component';
import { ReunionDetailleComponent } from './components/reunion-detaille/reunion-detaille.component';
import { NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { ListReunionsComponent } from './components/list-reunions/list-reunions.component';
import { ReversePipe } from './reverse.pipe';
import { GestionEquipeComponent } from './components/gestion-equipe/gestion-equipe.component';
import { EquipeDetailleComponent } from './components/equipe-detaille/equipe-detaille.component';
import { EquipeUpdateComponent } from './components/equipe-update/equipe-update.component';
import { EmployeService } from './services/employe/employe.service';
import {MatDialogModule, MatRadioModule} from '@angular/material';
import { AffectationRessourcesComponent } from './components/affectation-ressources/affectation-ressources.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AffectationTachesComponent } from './components/affectation-taches/affectation-taches.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BurndownchartComponent } from './components/burndownchart/burndownchart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { DatePipe } from '@angular/common'
import { AuthGuardService } from './services/jwt/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RoleGuardService } from './services/jwt/role-guard.service';
import { DatapassService } from './services/datapass/datapass.service';
import { AjoutProjetComponent } from './components/ajout-projet/ajout-projet.component';
import { AjoutSprintComponent } from './components/ajout-sprint/ajout-sprint.component';
import { AjoutcommentaireComponent } from './components/ajoutcommentaire/ajoutcommentaire.component';
import { UpdateCommentaireComponent } from './components/update-commentaire/update-commentaire.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { SimpleNotificationsModule } from 'angular2-notifications';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionComptesComponent,
    EmployeUpdatComponent,
    EmployeDetailleComponent,
    GestionProjetComponent,
    ProjetUpdateComponent,
    ProjetDetailleComponent,
    GestionSprintsComponent,
    SprintDetailleComponent,
    SprintUpdateComponent,
    GestionUserstoryComponent,
    UserstoryUpdateComponent,
    UserstoryDetailleComponent,
    GestionTacheComponent,
    TacheDetailleComponent,
    TacheUpdateComponent,
    GestionReunionComponent,
    ReunionUpdateComponent,
    ReunionDetailleComponent,
    ListReunionsComponent,
    ReversePipe,
    GestionEquipeComponent,
    EquipeDetailleComponent,
    EquipeUpdateComponent,
    AffectationRessourcesComponent,
    AffectationTachesComponent,
    KanbanBoardComponent,
    BurndownchartComponent,
    AjoutProjetComponent,
    AjoutSprintComponent,
    AjoutcommentaireComponent,
    UpdateCommentaireComponent,
    ConfirmDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgbTimepickerModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    DragDropModule ,
    ScrollingModule,
    MatTooltipModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    MatButtonModule,
    SimpleNotificationsModule .forRoot()
    
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },DatapassService,EmployeService, DatePipe, AuthGuardService, JwtHelperService, RoleGuardService 

  ],
  bootstrap: [AppComponent],
  entryComponents:[AffectationTachesComponent,AjoutcommentaireComponent,UpdateCommentaireComponent,ConfirmDialogComponent]
})
export class AppModule { }
