import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
    /*Para agregar que se ejecute una función antes de que cargue el estado,
    como en los resolves de angularjs (ui-router) agregamos esta linea de 
    código:
    canActivate: [AuthGuard] 
    Si es true permitirá que se active el estado, sino volverá al login*/
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
