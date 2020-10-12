import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(public activeModal: NgbActiveModal, private service: DevicesService) {
  }

  ngOnInit(): void {
    this.statusRemove.data = true;
    this.form = new FormGroup({
      idDispositivo: new FormControl(this.device.id, Validators.required),
      prefijo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', ),
      calculo: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
    })
    this.formEdit = new FormGroup({
      prefijo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl( '', ),
      calculo: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
    })
    console.log(this.device);
    this.getType();
    this.getSensors();
  }
  getSensors() {
    const dataDevice = {
      option: 'OBTENER-SENSORES',
      idDispositivo: this.device.id
    }
    this.statusSensors.data = false;
    this.statusSensors.loading = true;
    this.statusSensors.error = false;
    this.service.getSensor(dataDevice).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.sensors = rsp.data;
    }, err => {
      console.log(err);
      console.log(err);
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
    this.service.getType().toPromise().then((rsp: any) => {
      setTimeout(() => {
        this.types = rsp;
        this.statusType.data = true;
        this.statusType.loading = false;
      }, 2000);
    }, err => {
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
      sensor: [values]
    }
    console.log(sensors);
    this.statusSensors.loading = true;
    this.service.addSensor(sensors).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.form.reset();
      this.tryAgain();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Sensor agregado', icon: 'success' }
      );
    }, err => {
      console.log(err);
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
      idSensorDispositivo: sensorId
    }
    console.log(sensor);
    this.statusSensors.data = false;
    this.statusSensors.loading = true;
    this.service.removeSensor(sensor).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.statusSensors.loading = false;
      this.statusSensors.data = true;
      this.tryAgain();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000,
          title: 'Sensor eliminado correctamente', icon: 'success' }
      );
    }, err => {
      console.log(err);
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
    console.log(this.sensorEdit);
    this.formEdit.controls.prefijo.setValue(sensor.prefijo)
    this.formEdit.controls.nombre.setValue(sensor.nombre)
    this.formEdit.controls.descripcion.setValue(sensor.descripcion)
    this.formEdit.controls.calculo.setValue(sensor.calculo)
    this.formEdit.controls.tipo.setValue(sensor.tipo)
  }
  tryAgain() {
    this.statusType.data = false;
    this.statusType.loading = false;
    this.statusType.error = false;
    this.statusSensors.data = false;
    this.statusSensors.loading = false;
    this.statusSensors.error = false;
    this.getSensors();
    this.getType();
  }
  editSensor(sensor) {
    console.log(sensor);
    const sensors = {
      option: 'MODIFICAR-SENSOR',
      idSensorDispositivo: this.sensorEdit.idSensorDispositivo,
      idDispositivo: this.device.id,
      tipo: sensor.tipo,
      nombre: sensor.nombre,
      calculo: sensor.calculo,
      descripcion: sensor.descripcion,
      prefijo: sensor.prefijo
    }
    console.log(sensors);

    this.statusSensors.loading = true;
    this.service.editSensor(sensors).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.isEdit = false;
      this.formEdit.reset();
      this.tryAgain();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Sensor editado', icon: 'success' }
      );
    }, err => {
      console.log(err);
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
