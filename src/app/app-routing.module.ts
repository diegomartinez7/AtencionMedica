import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedienteComponent } from './components/expediente/expediente.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { RegistroPacientesComponent } from './components/registro-pacientes/registro-pacientes.component';
import { ConsultasComponent } from './components/consultas/consultas.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'expedientes', component: ExpedienteComponent },
  { path: 'estadisticas', component: StatisticsComponent },
  { path: 'iniciosesion', component: IniciosesionComponent },
  { path: 'registro_paciente', component: RegistroPacientesComponent },
  { path: 'consultas', component: ConsultasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
