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
  sensors = [];
  types: any [];
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private service: DevicesService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idDispositivo: new FormControl(this.device.id, Validators.required),
      prefijo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      calculo: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
     })
    console.log(this.device);
    this.getType();
  }
  saveSensor(value){
    this.sensors.push(value);
    console.log(value);
    
  }
  removeSensor(index){
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

  closeModal(){
    this.activeModal.close();
  }
  save() {
    const sensors = {
      option: 'CREAR-SENSOR',
      sensor: this.sensors
    }
    console.log(this.sensors);
    this.statusSave.data = false;
    this.statusSave.loading = true;
    this.statusSave.error = false;
      this.service.addSensor(sensors).toPromise().then((rsp: any) => {
        console.log(rsp);
        this.activeModal.close(true);
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Sensor agregado', icon: 'success'}
        );
      }, err => {
        console.log(err);
        this.statusSave.error = true;
        this.statusSave.loading = false;
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
        );
      });
  }

}
