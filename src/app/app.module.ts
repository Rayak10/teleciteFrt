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
import {MatRadioModule} from '@angular/material';
import { AffectationRessourcesComponent } from './components/affectation-ressources/affectation-ressources.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule, MatInputModule } from '@angular/material';


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
    AffectationRessourcesComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatRadioModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgbTimepickerModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,

    
  ],
  providers: [
    EmployeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
