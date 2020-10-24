import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-sensor-type',
  templateUrl: './add-edit-sensor-type.component.html',
  styleUrls: ['./add-edit-sensor-type.component.scss']
})
export class AddEditSensorTypeComponent implements OnInit {
  form: FormGroup;
  userInfo: any;
  statusSave = {
    data: null,
    loading: null,
    error: null
  }
  @Input() public senorType;
  token: any;

  constructor(public activeModal: NgbActiveModal, private service: DevicesService, private router: Router) { }

  ngOnInit(): void {
    this.token =  JSON.parse(sessionStorage.getItem('token'));

    this.form = new FormGroup({
      prefijo: new FormControl(this.senorType.isEdit ? this.senorType.data.prefijo : '', [Validators.required]),
      descripcion: new FormControl(this.senorType.isEdit ? this.senorType.data.descripcion : '', [Validators.required])
    })
  }
  save(values) {
    this.statusSave.loading = true;
    let user = {}
    if (this.senorType.isEdit) {
      user = {
        option: 'MODIFICAR-TIPO-SENSOR',
        idTipoSensor: this.senorType.data.idTipoSensor,
        prefijo: values.prefijo,
        descripcion: values.descripcion,
        token: this.token
      }
      this.service.addTypeSensor(user).toPromise().then((rsp: any) => {
        this.statusSave.loading = false;
        this.activeModal.close(true);
        Swal.fire(
          {
            toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Tipo de medida editada correctamente',
            icon: 'success'
          }
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
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning' }
        );
        this.statusSave.error = true;
        this.statusSave.loading = false;
      });

    } else {
      user = {
        option: 'CREAR-TIPO-SENSOR',
        prefijo: values.prefijo,
        descripcion: values.descripcion,
        token: this.token
      }
      this.service.addTypeSensor(user).toPromise().then((rsp: any) => {
        this.statusSave.loading = false;
        this.activeModal.close(true);
        Swal.fire(
          {
            toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Tipo de medida agregada correctamente',
            icon: 'success'
          }
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
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning' }
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
