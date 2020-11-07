import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  userInfo: any;
  statusSave = {
    data: null,
    loading: null,
    error: null
  }

  constructor(public activeModal: NgbActiveModal, private service: DevicesService, private router: Router) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
     })
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(sessionStorage.getItem('user-info')).datosUsuario.idUsuario;
  }
  save(values){
    const user = {
      option: 'MODIFICAR-CLAVE-USUARIO',
      idUsuario: this.userInfo,
      contraseña: values.password
    }
    this.statusSave.loading = true;
      this.service.changePassword(user).toPromise().then((rsp: any) => {
          this.statusSave.loading = false;
          this.activeModal.close(true);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Contraseña actualizada correctamente', icon: 'success'}
          );
      }, err => {
        console.log(err);
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
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
        );
        this.statusSave.error = true;
        this.statusSave.loading = false;
      });
  }

  closeModal() {
    this.activeModal.close();
  }

}
