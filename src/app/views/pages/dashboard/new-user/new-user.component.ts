import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  form: FormGroup;
  @Input() public user;
  clients: any [];

  roles: any = [
    {
      id: 1,
      nombre: 'Administrador'
    },
    {
      id: 2,
      nombre: 'Usuario'
    },
    {
      id: 3,
      nombre: 'Demo'
    },
  ]

  status = {
    data: null,
    loading: null,
    error: null
  }
  statusSave = {
    data: null,
    loading: null,
    error: null
  }
  token: any;

  constructor(public activeModal: NgbActiveModal, private service: DevicesService, private router: Router) {
  }

  ngOnInit(): void {
    this.token =  JSON.parse(sessionStorage.getItem('token'));
    this.getClients();
    this.form = new FormGroup({
      name: new FormControl(this.user.isEdit ? this.user.data.nombre : '', Validators.required),
      position: new FormControl(this.user.isEdit ? this.user.data.cargo : '', Validators.required),
      role: new FormControl(this.user.isEdit ? this.user.data.idRol : '', Validators.required),
      client: new FormControl(this.user.isEdit ? this.user.data.idCliente : '', Validators.required),
      email: new FormControl(this.user.isEdit ? this.user.data.correoElectronico : '', [Validators.required, Validators.email]),
      password: new FormControl(this.user.isEdit ? this.user.data.contraseña : '', Validators.required),
     })
  }
  getClients() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    const object = {
      option: 'GET-CLIENTE',
      token: this.token,
    }
      this.service.getCliente(object).toPromise().then((rsp: any) => {
          this.clients = rsp.data;
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

  save(values){
    const user = {
      option:  this.user.isEdit ? 'MODIFICAR-USUARIO' : 'CREAR-USUARIO',
      idUsuario: this.user.isEdit ? this.user.data.idUsuario : null,
      idCliente: values.client,
      idRol: values.role,
      nombre: values.name,
      cargo: values.position,
      correoElectronico: values.email,
      contraseña: values.password,
      token: this.token

    }
    this.statusSave.loading = true;
    if(!this.user.isEdit) {
      this.service.addUser(user).toPromise().then((rsp: any) => {
          this.statusSave.loading = false;
          this.activeModal.close(true);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Usuario agregado correctamente', icon: 'success'}
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
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
        );
        this.statusSave.error = true;
        this.statusSave.loading = false;
      });
    } else {
      this.service.editUser(user).toPromise().then((rsp: any) => {
          this.statusSave.loading = false;
          this.activeModal.close(true);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Usuario editado correctamente', icon: 'success'}
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
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
        );
        this.statusSave.error = true;
        this.statusSave.loading = false;
      });
    }

  }
  closeModal() {
    this.activeModal.close();
  }

}
