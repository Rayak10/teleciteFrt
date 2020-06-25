import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from '../app/components/login/login.component';
import { GestionComptesComponent } from '../app/components/gestion-comptes/gestion-comptes.component';



const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  }
  ,
  {
    path: 'gestionComptes',
    component: GestionComptesComponent
  }
  ,
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
