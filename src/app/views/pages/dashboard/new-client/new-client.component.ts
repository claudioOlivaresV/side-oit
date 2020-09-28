import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  form: FormGroup;

  status = {
    data: null,
    loading: null,
    error: null
  }

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      businessName: new FormControl('', Validators.required),
      rut: new FormControl('', Validators.required),
      address : new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      commune: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),

     })
   }

  ngOnInit(): void {
  }
  save(values){
    console.log(values);
    this.status.loading = true;
    setTimeout(() => {
      this.status.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Cliente agregado correctamente',
        showConfirmButton: true,
      });
    }, 3000);
    console.log(values);
  }

}
