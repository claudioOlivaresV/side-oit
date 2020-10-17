import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';
import { AddEditSensorTypeComponent } from '../add-edit-sensor-type/add-edit-sensor-type.component';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  active = 1;
  form: FormGroup;
  formSensor: FormGroup;
  types: any = [{nombre: 'lts', descripcion: 'litros'}];
  typesFilter: any = [{nombre: 'lts', descripcion: 'litros'}];
  myModel:string;
  typeSensor: any [];
  typeSensorFilter: any [];



  status = {
    data: null,
    loading: null,
    error: null
  }
  statusSensor = {
    data: null,
    loading: null,
    error: null
  }

  constructor( private service: DevicesService,  private modalService: NgbModal) {
    this.form = new FormGroup({
      sensorsMax: new FormControl('', Validators.required),
     })
     this.formSensor = new FormGroup({
      nameSensor: new FormControl('', Validators.required),
      desciptionSensor: new FormControl('', Validators.required),
      calculation: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
     })
   }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
      this.service.getTypeSensor().toPromise().then((rsp: any) => {
        console.log(rsp);
        this.typeSensor = rsp.data;
        this.typeSensorFilter = rsp.data;
        this.status.data = true;
        this.status.loading = false;
      }, err => {
        console.log(err);
        this.status.error = true;
        this.status.loading = false;
      });

  }
  save(values) {
    this.status.loading = true;
    setTimeout(() => {
      this.status.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Dispositivo agregado',
        showConfirmButton: true,
      });
    }, 3000);
    console.log(values);
  }
  saveSensor(values) {
    this.statusSensor.loading = true;
    setTimeout(() => {
      this.statusSensor.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Sensor agregado',
        showConfirmButton: true,
      });
    }, 3000);
    console.log(values);
  }
  addType() {
    const senorType = {
      isEdit: false,
      data: null,
    }
    console.log('click');
    const modalRef = this.modalService.open(AddEditSensorTypeComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.senorType = senorType;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.tryAgain();
      }
    });

  }
  edit(type) {
    const senorType = {
      isEdit: true,
      data: type,
    }
    console.log('click');
    const modalRef = this.modalService.open(AddEditSensorTypeComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.senorType = senorType;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.tryAgain();
      }
    });

  }
  remove(type){
    Swal.fire({
      title: 'Está eliminando un tipo de medida',
      text: '¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const client = {
          option: 'DELETE-TIPO-SENSOR',
          idTipoSensor: type.idTipoSensor
        }
        this.service.deleteTypeSensor(client).toPromise().then((rsp: any) => {
          console.log(rsp);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Tipo de medida eliminada correctamente', 
              icon: 'success'}
          )
          this.tryAgain();
        }, err => {
          console.log(err);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, intentelo nuevamente',
            icon: 'warning'}
          )
        });
      }
    })

  }
  tryAgain() {
    this.status.data = false;
    this.status.loading = false;
    this.status.error = false;
    this.getData();
  }
  filterByCell(filterValue :any): void {
    this.typeSensor = this.typeSensorFilter;
    this.typeSensor = this.typeSensorFilter.filter( (item) => {
      return item.prefijo.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim());
  });
  }

}
