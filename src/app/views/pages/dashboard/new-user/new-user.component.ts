import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  form: FormGroup;

  status = {
    data: null,
    loading: null,
    error: null
  }

  constructor() {
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
  }

  save(values){
    console.log(values);
    this.status.loading = true;
    setTimeout(() => {
      this.status.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Usuario agregado correctamente',
        showConfirmButton: true,
      });
    }, 3000);
    console.log(values);
  }

}
