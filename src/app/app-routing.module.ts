import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { RegistroPacientesComponent } from './components/registro-pacientes/registro-pacientes.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'estadisticas', component: StatisticsComponent },
  { path: 'iniciosesion', component: IniciosesionComponent },
  { path: 'registro_paciente', component: RegistroPacientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
