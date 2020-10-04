import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  @Input() public client;

  form: FormGroup;

  status = {
    data: null,
    loading: null,
    error: null
  }

  constructor(public activeModal: NgbActiveModal, private service: DevicesService) {
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.client.isEdit ? this.client.data.nombre : '', Validators.required),
      businessName: new FormControl(this.client.isEdit ? this.client.data.razonSocial : '', Validators.required),
      rut: new FormControl(this.client.isEdit ? this.client.data.rut : '', Validators.required),
      address : new FormControl(this.client.isEdit ? this.client.data.direccion : '', Validators.required),
      region: new FormControl(this.client.isEdit ? this.client.data.region : '', Validators.required),
      commune: new FormControl(this.client.isEdit ? this.client.data.comuna : '', Validators.required),
      phone: new FormControl(this.client.isEdit ? this.client.data.telefono : '', Validators.required),
      email: new FormControl(this.client.isEdit ? this.client.data.correoElectronico : '', [Validators.required, Validators.email]),

     })
  }
  save(values){
    const client = {
      option: 'CREAR-CLIENTE',
      nombre: values.name,
      razonSocial: values.businessName,
      rut: values.rut,
      direccion: values.address,
      region: values.region,
      comuna: values.commune,
      telefono: values.phone,
      correoElectronico: values.email

    };
    console.log(values);
    this.status.loading = true;
    if(!this.client.isEdit){
      this.service.addCliente(client).toPromise().then((rsp: any) => {
        this.status.loading = false;
        this.activeModal.close(true);
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Cliente agregado', icon: 'success'}
        );
    }, err => {
      this.status.error = true;
      this.status.loading = false;
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, vuelva a intentarlo', icon: 'warning'}
      );
    });
    } else {
      this.status.loading = false;
        this.activeModal.close(true);
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Cliente editado', icon: 'success'}
        );

    }
  }
  closeModal() {
    this.activeModal.close();
  }

}
