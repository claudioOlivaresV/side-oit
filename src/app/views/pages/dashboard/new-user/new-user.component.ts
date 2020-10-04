import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(public activeModal: NgbActiveModal, private service: DevicesService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
     })
  }

  ngOnInit(): void {
    this.getClients();
  }
  getClients() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
      this.service.getCliente().toPromise().then((rsp: any) => {
        console.log(rsp);
          this.clients = rsp.data;
          this.status.data = true;
          this.status.loading = false;
      }, err => {
        this.status.error = true;
        this.status.loading = false;
      });
  }

  save(values){
    const user = {
      option: 'CREAR-USUARIO',
      idCliente: values.client,
      idRol: values.role,
      nombre: values.name,
      cargo: values.position,
      correoElectronico: values.email,
      contraseña: values.password
    }
    console.log(values);
    this.statusSave.loading = true;
    this.service.addUser(user).toPromise().then((rsp: any) => {
      console.log(rsp);
        this.statusSave.loading = false;
        this.activeModal.close(true);
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Usuario agregado correctamente', icon: 'success'}
        );
    }, err => {
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Usuario agregado correctamente', icon: 'success'}
      );
      this.statusSave.error = true;
      this.statusSave.loading = false;
    });

  }
  closeModal() {
    this.activeModal.close();
  }

}
