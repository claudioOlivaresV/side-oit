import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';
import { AddSensorComponent } from '../add-sensor/add-sensor.component';
import { NewDeviceComponent } from '../new-device/new-device.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  form: FormGroup;
  statusSave = {
    data: null,
    loading: null,
    error: null
  }
  status = {
    data: null,
    loading: null,
    error: null
  }
  devices: any[];
  devicesFilter: any [];

  modalReference: any;
  basicModalCloseResult = '';
  myModel:string;
  role: number;
  token: any;



  constructor(private router: Router,  private modalService: NgbModal,private service: DevicesService) {
    this.form = new FormGroup({
      client: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      length: new FormControl('', Validators.required),
      height:new FormControl('', Validators.required),
      timeInterval: new FormControl('', Validators.required),
     })
   }

  ngOnInit(): void {
    // const dataTable = new DataTable("#dataTableExample");
    this.token =  JSON.parse(sessionStorage.getItem('token'));
    this.getData();
    this.role = JSON.parse(sessionStorage.getItem('user-info')).idRol;
    if( this.role === 2 || this.role === undefined ) {
      this.router.navigate(['/dashboard'])
    }

  }
  getData() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    const objectquery = {
      option: 'OBTENER-DISPOSITIVOS',
      token: this.token
    }
      this.service.getDevicesData(objectquery).toPromise().then((rsp: any) => {
        this.devices = rsp.data.map((data) => {
          const object = {
            id: data.idDispositivo,
            idClient: data.idCliente,
            client: "",
            name: data.nombre,
            description: data.descripcion,
            serialNumber: data.numeroSerie,
            location: data.ubicacion,
            latitude: data.latitud,
            numberOfSensors: data.cantSensores,
            lastReading: data.ultimaModificacion,
            length: data.longitud,
            height: data.altura,
            timeInterval: data.intervaloTiempo,
            active: data.activo
          }
          return object;
        });
        this.devicesFilter = rsp.data.map((data) => {
          const object = {
            id: data.idDispositivo,
            idClient: data.idCliente,
            client: "",
            name: data.nombre,
            description: data.descripcion,
            serialNumber: data.numeroSerie,
            location: data.ubicacion,
            latitude: data.latitud,
            numberOfSensors: data.cantSensores,
            lastReading: data.ultimaModificacion,
            length: data.longitud,
            height: data.altura,
            timeInterval: data.intervaloTiempo,
            active: data.activo
          }
          return object;
        });
        this.status.data = true;
        this.status.loading = false;
      }, err => {
        if (err.error.message === 'TOKEN CADUCADO') {
          Swal.fire({
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
  goToNewDevice() {
    this.router.navigate(['/dashboard/new-device']);
  }
  editDevice(deviceData){
    const device = {
      isEdit: true,
      data: deviceData
    }
    const modalRef = this.modalService.open(NewDeviceComponent, {size: 'lg', scrollable: true});
    modalRef.componentInstance.device = device;
    modalRef.result.then((result) => {
      if (result) {
        this.tryAgain();
      }
    });

  }
  addDevice() {
    const device = {
      isEdit: false,
      data: null,
    }
    const modalRef = this.modalService.open(NewDeviceComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.device = device;
    modalRef.result.then((result) => {
      if (result) {
        this.tryAgain();
      }
    });
    // this.modalReference = this.modalService.open(NewDeviceComponent, {size: 'lg', scrollable: true}).result.then((result) => {
    //   this.basicModalCloseResult = "Modal closed" + result;
    //   console.log(this.basicModalCloseResult);
    // }).catch((res) => {});
  }
  addSensor(device) {

    const modalRef = this.modalService.open(AddSensorComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.device = device;
    modalRef.result.then((result) => {
      if (result) {
      }
    });

  }
  removeDevice(deviceId){
    Swal.fire({
      title: 'Está eliminando un dispositivo',
      text: '¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
          const device = {
            option: 'DELETE-DISPOSITIVO',
            idDispositivo: deviceId,
            token: this.token
          }
          this.service.deleteDevice(device).toPromise().then((rsp: any) => {
            Swal.fire(
              { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Dispositivo eliminado correctamente', icon: 'success'}
            )
            this.tryAgain();
          }, err => {
            if (err.error.message === 'TOKEN CADUCADO') {
              Swal.fire({
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
    this.devices = this.devicesFilter;
    this.devices = this.devices.filter( (item) => {
      return item.description.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim());
  });
  }
}
