import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.scss'],
})
export class NewDeviceComponent implements OnInit {
  @Output()
  propagar = new EventEmitter<any>();

  @Input() public device;

  form: FormGroup;
  statusSave = {
    data: null,
    loading: null,
    error: null
  }
  status = {
    data: null,
    loading: null,
    error: null
  }
  clients: any [];
  basicModalCloseResult = '';
  constructor(private router: Router,  private modalService: NgbModal, public activeModal: NgbActiveModal,
              private service: DevicesService) {
   }
  ngOnInit(): void {
    this.getClients();
    this.form = new FormGroup({
      client: new FormControl(this.device.isEdit ? this.device.data.idClient : '', Validators.required),
      name: new FormControl(this.device.isEdit ? this.device.data.name : '', Validators.required),
      description: new FormControl(this.device.isEdit ? this.device.data.description : '', Validators.required),
      serialNumber: new FormControl(this.device.isEdit ? this.device.data.serialNumber : '', Validators.required),
      location: new FormControl(this.device.isEdit ? this.device.data.location : '', Validators.required),
      latitude: new FormControl(this.device.isEdit ? this.device.data.latitude : '', Validators.required),
      length: new FormControl(this.device.isEdit ? this.device.data.length : '', Validators.required),
      height:new FormControl(this.device.isEdit ? this.device.data.height : '', Validators.required),
      timeInterval: new FormControl(this.device.isEdit ? this.device.data.timeInterval : '', Validators.required),
     })
  }

  getClients() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
      this.service.getCliente().toPromise().then((rsp: any) => {
        setTimeout(() => {
          this.clients = rsp;
          this.status.data = true;
          this.status.loading = false;
        }, 2000);
      }, err => {
        this.status.error = true;
        this.status.loading = false;
      });
  }

  save(values) {
    this.statusSave.loading = true;
    setTimeout(() => {
      this.statusSave.loading = false;
      if(this.device.isEdit) {
        this.activeModal.close();
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Dispositivo editado correctamente', icon: 'success'}
        );

      } else {
        this.activeModal.close();
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Dispositivo agregado', icon: 'success'}
        );
      }
    }, 3000);
  }
  closeModal(){
    this.activeModal.close();
  }
}
