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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionComptesComponent,
    EmployeUpdatComponent,
    EmployeDetailleComponent,
    GestionProjetComponent,
    ProjetUpdateComponent,
    ProjetDetailleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
