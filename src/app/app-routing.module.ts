import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from '../app/components/login/login.component';
import { GestionComptesComponent } from '../app/components/gestion-comptes/gestion-comptes.component';
import { EmployeUpdatComponent } from './components/employe-updat/employe-updat.component';
import { EmployeDetailleComponent } from './components/employe-detaille/employe-detaille.component';



const routes: Routes = [
 
  {path: 'login', component: LoginComponent},
  {path: 'gestionComptes', component: GestionComptesComponent},
  {path: 'update/:id', component: EmployeUpdatComponent},
  {path: 'details/:id', component: EmployeDetailleComponent},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
