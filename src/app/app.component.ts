import { Component } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { SesionesService } from './sesiones.service';

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
  usuario: any = {};

  constructor(private router: Router, private _sesionesService: SesionesService){
    this.routeEvents = this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.currentRoute = event.url;
        console.log(this.currentRoute);

        this.usuario = this._sesionesService.obtenerUsuario();
        if(this.usuario)
          this.usuario.tipo = 1;
        console.log(this.usuario);
      }
    });
    
    //Redirigimos al usuario si no ha iniciado sesión
    if(!this._sesionesService.sesionIniciada()){
      this.router.navigateByUrl('/iniciosesion');
    }
  }

  cerrarSesion(){
    //Navegamos hacia el componente de inicio de sesión
    this.router.navigateByUrl('/iniciosesion');
    //Cambiamos a false la sesión y borramos el registro del usuario en LocalStorage
    this._sesionesService.cerrarSesion();
  }

  sectionClases(){
    let permitir = this.currentRoute != '/iniciosesion';
    return {
      'row': permitir,
      'section-height': permitir,
      'w-100': permitir
    };
  }

  routerClases(){
    let permitir = this.currentRoute != '/iniciosesion';
    return { 
      'col-xl-9': permitir,
      'col-12': permitir 
    };
  }

  ngOnDestroy(){
    this.routeEvents.unsubscribe();
  }
}
