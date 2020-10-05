import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DevicesService } from 'src/app/services/devices/devices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  status = {
    data: null,
    loading: null,
    error: null
  }
  form: FormGroup;


  constructor(private router: Router, private route: ActivatedRoute, private service: DevicesService) {
    this.form = new FormGroup({
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
     })
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // if (sessionStorage.getItem('isLoggedin')) {
    //   this.router.navigate([this.returnUrl]);
    // }
  }

  onLoggedin(values) {
    const user = {
      correo: values.correo,
      contraseña: values.contrasena

    }
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
      this.service.login(user).toPromise().then((rsp: any) => {
        console.log(rsp);
        sessionStorage.setItem('isLoggedin', 'true');
        sessionStorage.setItem('user-info', JSON.stringify(rsp.data));
        this.router.navigate([this.returnUrl]);
        this.status.data = true;
        this.status.loading = false;
      }, err => {
        this.form.reset();
        console.log(err);
        this.status.error = true;
        this.status.loading = false;
      });
  }

}
