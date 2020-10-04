import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';

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
    this.form = new FormGroup({
      preFixed: new FormControl('', Validators.required),
      nameSensor: new FormControl('', Validators.required),
      desciptionSensor: new FormControl('', Validators.required),
      calculation: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
     })
  }

  ngOnInit(): void {
    console.log(this.device);
    this.getType();
  }
  saveSensor(value){
    this.sensors.push(value);
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

}
