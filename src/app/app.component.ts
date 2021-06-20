import { Component } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AtencionMedica';
  estado: boolean = true;
  routeEvents: any;
  currentRoute: string = "";

  constructor(private router: Router){
    this.routeEvents = this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.currentRoute = event.url;
        console.log(this.currentRoute);
      }
    });
  }

  cerrarSesion(){
    //Navegamos hacia el componente de inicio de sesión
    this.router.navigateByUrl('/inicioSesion');
    //Cambiamos a false la sesión

    //Limpiamos las variables que tienen información del usuario
    
  }

  ngOnDestroy(){
    this.routeEvents.unsubscribe();
  }
}
