import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PacientesService } from '../registro-pacientes/pacientes-service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasService } from './consultas.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import jsPDF from "jspdf";

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
  animations: [
    trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ConsultasComponent implements OnInit {
  filtroPaciente: any;
  pacientes: any = [];
  consultas: any = [];

  consultaColumnas: string[] = ['Apellidos', 'Nombre', 'Fecha', 'Peso', 'Talla', 'Temperatura', 'Presion_A', 'Pulso'];
  dataSourceConsultas = new MatTableDataSource<any>();
  expandedEvent: any | null;

  constructor(private _pacientesService: PacientesService,
    private _consultasService: ConsultasService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    //Realizamos la solicitud HTTP de tipo GET para obtener todos los pacientes
    this.pacientes = await this._pacientesService.getAll().toPromise();
    //La propiedad array de la respuesta es la que tiene la información
    this.pacientes = this.pacientes.array.map((paciente: any) => {
      return {
        'ID': paciente['ID'],
        'Nombre': paciente.Nombre,
        'Apellidos': paciente.Apellidos
      };
    });
    console.log(this.pacientes);

    //Realizamos la solicitud HTTP de tipo GET para obtener todas las consultas
    this.consultas = await this._consultasService.getAll().toPromise();
    this.consultas = this.consultas.array;
    console.log(this.consultas);

   //Asignamos la información al dataSource que usará el mat-table
    this.dataSourceConsultas.data = this.consultas;
  }

  async filtrarConsultas(valor: any){
    if(valor=='Todos'){
      this.getData();
    }
    else{
      let consultas = await this._consultasService.getByID(Number(valor)).toPromise();
      this.dataSourceConsultas.data = consultas.array;
    }

    //Refrescamos los cambios para el mat-table
    this.cdr.markForCheck();
  }

  async hacerConsulta(){
    const modalRespuesta = await this.dialog.open(ModalComponent, {
      //Establecemos la información a mandarle al modal
      data: {
        tipo: "Consulta" //Especificamos que el modal sea de consulta
      },
      width: 'auto',
      height: 'auto'
    }).afterClosed().toPromise();

    console.log(modalRespuesta);
  }

  documento(event: any){
    const doc = new jsPDF();

        let pageW = doc.internal.pageSize.getWidth();
        let pageH = doc.internal.pageSize.getHeight();

        let img = new Image();
        img.src = 'assets/img/fondoSISSSTEM.png';
        doc.addImage(img, 'png', 0, 0, pageW, pageH);
        doc.setFontSize(12);
        doc.text(`Aguascalientes, Ags.`, 190, 46, { align: "right" });
        doc.text('CONSULTA VIRTUAL', pageW / 2, 57, { renderingMode: "fillThenStroke", align: "center" });
        doc.text(`Fecha: ${event.Fecha}`, pageW - 45, 57, { renderingMode: "fillThenStroke" });

        //Body
        doc.text(`Datos del paciente: ${event.Apellidos} ${event.Nombre}`, 14, 70, { renderingMode: "fillThenStroke" });

        doc.text(`Peso: ${event.Peso}`, 14, 77);
        doc.text(`Talla: ${event.Talla}`, 14, 84);
        doc.text(`Temperatura: ${event.Temperatura}`, 14, 91);
        doc.text(`Presión arterial: ${event.Presion_A}`, 14, 98);
        doc.text(`Pulso: ${event.Pulso}`, 14, 105);
        doc.text(`Malestar: ${event.Malestar}`, 14, 112);

        doc.text('OBSERVACIONES', pageW / 2, 125, { renderingMode: "fillThenStroke", align: "center" });
        doc.text(`Diagnostico: ${event.Diagnostico}`, 14, 138);
        doc.text(`Nota: ${event.Nota}`, 14, 150);

        doc.save("Consulta.pdf");
  }

}
