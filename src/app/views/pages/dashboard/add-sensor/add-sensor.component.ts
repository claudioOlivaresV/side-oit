import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss']
})
export class AddSensorComponent implements OnInit {
  @Input() public device;

  statusSave = {
    data: null,
    loading: null,
    error: null
  }
  statusType = {
    data: null,
    loading: null,
    error: null
  }
  statusSensors = {
    data: null,
    loading: null,
    error: null
  }
  statusRemove = {
    data: null,
    loading: null,
    error: null
  }
  isEdit = false;
  sensors = [];
  types: any[];
  form: FormGroup;
  formEdit: FormGroup;
  sensorEdit : any;
  idSensor: any;
  token: any;

  constructor(public activeModal: NgbActiveModal, private service: DevicesService, private router: Router) {
  }

  ngOnInit(): void {
    this.token =  JSON.parse(sessionStorage.getItem('token'));
    this.getType();
    this.getSensors();
    this.statusRemove.data = true;
    this.form = new FormGroup({
      idDispositivo: new FormControl(this.device.id, Validators.required),
      prefijo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', ),
      calculo: new FormControl('', Validators.required),
      idTipoSensor: new FormControl('', Validators.required),
      output: new FormControl(false, ),
    })
    this.formEdit = new FormGroup({
      prefijo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl( '', ),
      calculo: new FormControl('', Validators.required),
      idTipoSensor: new FormControl('', Validators.required),
      output: new FormControl('')
    })

  }
  getSensors() {
    console.log(this.device);
    const dataDevice = {
      option: 'OBTENER-SENSORES',
      idDispositivo: this.device.id,
      token: this.token
    }
    this.statusSensors.data = false;
    this.statusSensors.loading = true;
    this.statusSensors.error = false;
    this.service.getSensor(dataDevice).toPromise().then((rsp: any) => {
      this.sensors = rsp.data;
      this.statusSensors.data = true;
      this.statusSensors.loading = false;
    }, err => {
      this.activeModal.close();
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
      this.statusSensors.error = true;
      this.statusSensors.loading = false;
    });

  }
  // saveSensor(value) {
  //   this.sensors.push(value);
  //   console.log(value);
  // }
  removeSensor(index) {
    this.sensors.splice(index, 1);
  }
  getType() {
    this.statusType.data = false;
    this.statusType.loading = true;
    this.statusType.error = false;
    const object = {
      option: 'GET-TIPO-SENSOR',
      token: this.token,
    }
    this.service.getTypeSensor(object).toPromise().then((rsp: any) => {
        this.types = rsp.data;
        this.statusType.data = true;
        this.statusType.loading = false;
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
      this.statusType.error = true;
      this.statusType.loading = false;
    });
  }

  closeModal() {
    this.activeModal.close();
  }
  saveSensor(values) {
    const sensors = {
      option: 'CREAR-SENSOR',
      sensor: [values],
      token: this.token,
    }
    this.statusSensors.loading = true;
    this.service.addSensor(sensors).toPromise().then((rsp: any) => {
      this.form.reset();
      this.tryAgain();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Sensor agregado', icon: 'success' }
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
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning' }
      );
    });
  }
  remove(sensorId){
    const sensor = {
      option: 'DELETE-SENSOR',
      idSensorDispositivo: sensorId,
      token: this.token
    }
    this.statusSensors.data = false;
    this.statusSensors.loading = true;
    this.service.removeSensor(sensor).toPromise().then((rsp: any) => {
      this.statusSensors.loading = false;
      this.statusSensors.data = true;
      this.tryAgain();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000,
          title: 'Sensor eliminado correctamente', icon: 'success' }
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
      this.statusSensors.error = true;
      this.statusSensors.loading = false;
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning' }
      );
    });

  }
  edit(sensor){
    this.isEdit = true;
    this.sensorEdit = sensor;
    this.formEdit.controls.prefijo.setValue(sensor.prefijo)
    this.formEdit.controls.nombre.setValue(sensor.nombre)
    this.formEdit.controls.descripcion.setValue(sensor.descripcion)
    this.formEdit.controls.calculo.setValue(sensor.calculo)
    this.formEdit.controls.idTipoSensor.setValue(sensor.idTipoSensor)
    this.formEdit.controls.output.setValue(sensor.output)
  }
  tryAgain() {
    this.statusType.data = false;
    this.statusType.loading = true;
    this.statusType.error = false;
    this.statusSensors.data = false;
    this.statusSensors.loading = true;
    this.statusSensors.error = false;
    this.getSensors();
    this.getType();
  }
  editSensor(sensor) {
    const sensors = {
      option: 'MODIFICAR-SENSOR',
      idSensorDispositivo: this.sensorEdit.idSensorDispositivo,
      idDispositivo: this.device.id,
      tipo: parseInt(sensor.idTipoSensor),
      nombre: sensor.nombre,
      calculo: sensor.calculo,
      descripcion: sensor.descripcion,
      prefijo: sensor.prefijo,
      output: sensor.output,
      token: this.token
    }

    this.statusSensors.loading = true;
    this.service.editSensor(sensors).toPromise().then((rsp: any) => {
      this.isEdit = false;
      this.formEdit.reset();
      this.tryAgain();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Sensor editado', icon: 'success' }
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
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning' }
      );
    });

  }
  cancel() {
    this.isEdit = false;
    this.formEdit.reset();
    this.sensorEdit = null;
  }

}
