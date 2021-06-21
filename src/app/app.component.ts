import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { ModalComponent } from './components/shared/modal/modal.component';
import { SesionesService } from './sesiones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  @ViewChild('link') link!: ElementRef;

  title = 'AtencionMedica';
  estado: boolean = true;
  routeEvents: any;
  currentRoute: string = "";
  usuario: any = {};
  solicitudes: any = [];
  solicitud: any = {};

  constructor(private router: Router,
    private _sesionesService: SesionesService,
    private dialog: MatDialog
  ){
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

  ngOnInit(): void {
    this.getSolicitudes();
  }

  async getSolicitudes(){
    this.solicitudes = await this._sesionesService.obtenerSolicitudes().toPromise();
    this.solicitudes = this.solicitudes.solicitudes;
    // console.log("Solicitudes",JSON.stringify(this.solicitudes));
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

  async popSolicitud(index: number){
    this.solicitud = await this._sesionesService.obtenersolicitud(index).toPromise();
    this.solicitud = this.solicitud.solicitud;
    console.log(this.solicitud);
    this.solicitudes = await this._sesionesService.obtenerSolicitudes().toPromise();
    this.solicitudes = this.solicitudes.solicitudes;
    this.link.nativeElement.click();

    const modalRespuesta = await this.dialog.open(ModalComponent, {
      //Establecemos la información a mandarle al modal
      data: {
        tipo: "ConsultaActiva", //Especificamos que el modal sea de consulta
        solicitud: this.solicitud
      },
      width: '100vh',
      height: 'auto'
    }).afterClosed().toPromise();

    console.log(modalRespuesta);
  }

  ngOnDestroy(){
    this.routeEvents.unsubscribe();
  }
}
