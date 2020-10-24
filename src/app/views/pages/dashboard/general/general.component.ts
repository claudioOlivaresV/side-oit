import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  token: any;

  constructor( private service: DevicesService,  private modalService: NgbModal, private router: Router) {
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
    this.token =  JSON.parse(sessionStorage.getItem('token'));
    this.getData();
  }
  getData(){
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    const object = {
      option: 'GET-TIPO-SENSOR',
      token: this.token,
    }
      this.service.getTypeSensor(object).toPromise().then((rsp: any) => {
        console.log(rsp.data);
        this.typeSensor = rsp.data;
        this.typeSensorFilter = rsp.data;
        this.status.data = true;
        this.status.loading = false;
      }, err => {
        if (err.error.message === 'TOKEN CADUCADO') {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'warning',
            title: 'La sesión expiro',
            text: 'Porfavor, vuelva a iniciar sessión',
          }).then((result) => {
            if (result.isConfirmed) {
              sessionStorage.removeItem('isLoggedin');
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('user-info');
              if (!sessionStorage.getItem('isLoggedin')) {
                this.router.navigate(['/auth/login']);
              }
            }
            console.log(result);
          })
        }
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
  }
  addType() {
    const senorType = {
      isEdit: false,
      data: null,
    }
    const modalRef = this.modalService.open(AddEditSensorTypeComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.senorType = senorType;
    modalRef.result.then((result) => {
      if (result) {
        this.tryAgain();
      }
    });

  }
  edit(type) {
    const senorType = {
      isEdit: true,
      data: type,
    }
    const modalRef = this.modalService.open(AddEditSensorTypeComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.senorType = senorType;
    modalRef.result.then((result) => {
      if (result) {
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
          idTipoSensor: type.idTipoSensor,
          token: this.token
        }
        this.service.deleteTypeSensor(client).toPromise().then((rsp: any) => {
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Tipo de medida eliminada correctamente', 
              icon: 'success'}
          )
          this.tryAgain();
        }, err => {
          if (err.error.message === 'TOKEN CADUCADO') {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'warning',
              title: 'La sesión expiro',
              text: 'Porfavor, vuelva a iniciar sessión',
            }).then((result) => {
              if (result.isConfirmed) {
                sessionStorage.removeItem('isLoggedin');
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user-info');
                if (!sessionStorage.getItem('isLoggedin')) {
                  this.router.navigate(['/auth/login']);
                }
              }
              console.log(result);
            })
          }
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
