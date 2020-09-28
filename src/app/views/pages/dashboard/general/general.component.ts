import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  active = 1;
  form: FormGroup;
  formSensor: FormGroup;

  status = {
    data: null,
    loading: null,
    error: null
  }
  statusSensor = {
    data: null,
    loading: null,
    error: null
  }

  constructor() {
    this.form = new FormGroup({
      sensorsMax: new FormControl('', Validators.required),
     })
     this.formSensor = new FormGroup({
      nameSensor: new FormControl('', Validators.required),
      desciptionSensor: new FormControl('', Validators.required),
      calculation: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
     })
   }

  ngOnInit(): void {
  }
  save(values) {
    this.status.loading = true;
    setTimeout(() => {
      this.status.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Dispositivo agregado',
        showConfirmButton: true,
      });
    }, 3000);
    console.log(values);
  }
  saveSensor(values) {
    this.statusSensor.loading = true;
    setTimeout(() => {
      this.statusSensor.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Sensor agregado',
        showConfirmButton: true,
      });
    }, 3000);
    console.log(values);
  }

}
