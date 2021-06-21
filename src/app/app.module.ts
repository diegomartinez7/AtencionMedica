import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ExpedienteComponent } from './components/expediente/expediente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PieSocioeconomicoComponent } from './components/pie-socioeconomico/pie-socioeconomico.component';
import { RadarGruposComponent } from './components/radar-grupos/radar-grupos.component';
import { BarrasGeneroComponent } from './components/barras-genero/barras-genero.component';

import { ChartsModule } from 'ng2-charts';
import { BarrasPoblacionComponent } from './components/barras-poblacion/barras-poblacion.component';
import { PieEnfermedadesComponent } from './components/pie-enfermedades/pie-enfermedades.component';
import { RegistroPacientesComponent } from './components/registro-pacientes/registro-pacientes.component';
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { LlamadaComponent } from './components/llamada/llamada.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SolicitudConsultaComponent } from './components/consultas/solicitud-consulta/solicitud-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    ExpedienteComponent,
    PieSocioeconomicoComponent,
    RadarGruposComponent,
    BarrasGeneroComponent,
    BarrasPoblacionComponent,
    PieEnfermedadesComponent,
    RegistroPacientesComponent,
    IniciosesionComponent,
    LlamadaComponent,
    ConsultasComponent,
    ModalComponent,
    SolicitudConsultaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
