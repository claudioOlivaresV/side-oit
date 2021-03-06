import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.scss'],
})
export class NewDeviceComponent implements OnInit {
  @Output()
  propagar = new EventEmitter<any>();

  @Input() public device;

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
  clients: any [];
  basicModalCloseResult = '';
  token: any;
  constructor(private router: Router,  private modalService: NgbModal, public activeModal: NgbActiveModal,
              private service: DevicesService) {
   }
  ngOnInit(): void {
    this.token =  JSON.parse(sessionStorage.getItem('token'));

    this.getClients();
    this.form = new FormGroup({
      client: new FormControl(this.device.isEdit ? this.device.data.idClient : '', Validators.required),
      name: new FormControl(this.device.isEdit ? this.device.data.name : '', Validators.required),
      description: new FormControl(this.device.isEdit ? this.device.data.description : '', Validators.required),
      serialNumber: new FormControl(this.device.isEdit ? this.device.data.serialNumber : '', Validators.required),
      location: new FormControl(this.device.isEdit ? this.device.data.location : '', Validators.required),
      latitude: new FormControl(this.device.isEdit ? this.device.data.latitude : '', Validators.required),
      length: new FormControl(this.device.isEdit ? this.device.data.length : '', Validators.required),
      height:new FormControl(this.device.isEdit ? this.device.data.height : '', Validators.required),
      timeInterval: new FormControl(this.device.isEdit ? this.device.data.timeInterval : '', Validators.required),
     })
  }

  getClients() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    const objectQuery = {
      option: 'GET-CLIENTE',
      token: this.token,
    }
      this.service.getCliente(objectQuery).toPromise().then((rsp: any) => {
          this.clients = rsp.data.map((data) => {
          let object = {};
            if(data.activo){
              object = {
                idClient: data.idCliente,
                name: data.nombre,
              }
            }
            return object;
          });
          this.status.data = true;
          this.status.loading = false;
      }, err => {
        if (err.error.message === 'TOKEN CADUCADO') {
          this.activeModal.close();
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
    const device = {
      option: this.device.isEdit ? 'MODIFICAR-DISPOSITIVO' : 'CREAR-DISPOSITIVO',
      idDispositivo: this.device.isEdit ? this.device.data.id : null,
      idCliente: values.client ,
      nombre: values.name,
      descripcion: values.description,
      numeroSerie: values.serialNumber,
      ubicacion: values.location,
      latitud: values.latitude,
      longitud: values.length,
      altura: values.height,
      intervaloTiempo: values.timeInterval,
      token: this.token,
    }
    this.statusSave.loading = true;

      if(this.device.isEdit) {
        this.service.editDevice(device).toPromise().then((rsp: any) => {
          this.statusSave.loading = false;
          this.activeModal.close(true);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Dispositivo editado', icon: 'success'}
          );
      }, err => {
        if (err.error.message === 'TOKEN CADUCADO') {
          this.activeModal.close();
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
        this.statusSave.error = true;
        this.statusSave.loading = false;
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
        );
      });

      } else {
        this.service.addDevice(device).toPromise().then((rsp: any) => {
            this.statusSave.loading = false;
            this.activeModal.close(true);
            Swal.fire(
              { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Dispositivo agregado', icon: 'success'}
            );
        }, err => {
          if (err.error.message === 'TOKEN CADUCADO') {
            this.activeModal.close();
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
          this.statusSave.error = true;
          this.statusSave.loading = false;
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
          );
        });
      }
  }
  closeModal(){
    this.activeModal.close();
  }
  tryAgain(){
    this.status.data = false;
    this.status.loading = false;
    this.status.error = false;
    this.getClients();

  }
}
