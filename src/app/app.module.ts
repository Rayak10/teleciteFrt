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
    UserstoryUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
