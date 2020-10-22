import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  @Input() public client;

  form: FormGroup;

  status = {
    data: null,
    loading: null,
    error: null
  }
  token: any;

  constructor(public activeModal: NgbActiveModal, private service: DevicesService, private router: Router) {
   }

  ngOnInit(): void {
    this.token =  JSON.parse(sessionStorage.getItem('token'));
    this.form = new FormGroup({
      name: new FormControl(this.client.isEdit ? this.client.data.nombre : '', Validators.required),
      businessName: new FormControl(this.client.isEdit ? this.client.data.razonSocial : '', Validators.required),
      rut: new FormControl(this.client.isEdit ? this.client.data.rut : '', Validators.required),
      address : new FormControl(this.client.isEdit ? this.client.data.direccion : '', Validators.required),
      region: new FormControl(this.client.isEdit ? this.client.data.region : '', Validators.required),
      commune: new FormControl(this.client.isEdit ? this.client.data.comuna : '', Validators.required),
      phone: new FormControl(this.client.isEdit ? this.client.data.telefono : '', Validators.required),
      email: new FormControl(this.client.isEdit ? this.client.data.correoElectronico : '', [Validators.required, Validators.email]),

     })
  }
  save(values){
    const client = {
      option: this.client.isEdit ? 'MODIFICAR-CLIENTE' : 'CREAR-CLIENTE',
      idCliente: this.client.isEdit ? this.client.data.idCliente : null,
      nombre: values.name,
      razonSocial: values.businessName,
      rut: values.rut,
      direccion: values.address,
      region: values.region,
      comuna: values.commune,
      telefono: values.phone,
      correoElectronico: values.email,
      token: this.token

    };
    this.status.loading = true;
    if(!this.client.isEdit){
      this.service.addCliente(client).toPromise().then((rsp: any) => {
        this.status.loading = false;
        this.activeModal.close(true);
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Cliente agregado', icon: 'success'}
        );
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
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
      );
    });
    } else {
      this.service.editClient(client).toPromise().then((rsp: any) => {
        this.status.loading = false;
        this.activeModal.close(true);
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Cliente modificado', icon: 'success'}
        );
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
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
      );
    });

    }
  }
  closeModal() {
    this.activeModal.close();
  }

}
