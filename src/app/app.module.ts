import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HomeComponent } from './components/home/home.component';
import { MatIconModule } from '@angular/material/icon';
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

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    HomeComponent,
    PieSocioeconomicoComponent,
    RadarGruposComponent,
    BarrasGeneroComponent,
    BarrasPoblacionComponent,
    PieEnfermedadesComponent,
    RegistroPacientesComponent,
    IniciosesionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
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
