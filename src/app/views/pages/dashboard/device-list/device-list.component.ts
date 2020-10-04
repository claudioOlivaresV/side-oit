import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';
import { AddSensorComponent } from '../add-sensor/add-sensor.component';
import { NewDeviceComponent } from '../new-device/new-device.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
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
  devices: any[];
  devicesFilter: any [];

  modalReference: any;
  basicModalCloseResult = '';


  constructor(private router: Router,  private modalService: NgbModal,private service: DevicesService) {
    this.form = new FormGroup({
      client: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      length: new FormControl('', Validators.required),
      height:new FormControl('', Validators.required),
      timeInterval: new FormControl('', Validators.required),
     })
   }

  ngOnInit(): void {
    // const dataTable = new DataTable("#dataTableExample");
    this.getData();
  }
  getData() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    setTimeout(() => {
      this.service.getDevicesData().toPromise().then((rsp: any) => {
        console.log(rsp);
        this.devices = rsp;
        this.devicesFilter = rsp;
        this.status.data = true;
        this.status.loading = false;
      }, err => {
        console.log(err);
        this.status.error = true;
        this.status.loading = false;
      });
    }, 3000);

  }
  goToNewDevice() {
    this.router.navigate(['/dashboard/new-device']);
  }
  editDevice(deviceData){
    const device = {
      isEdit: true,
      data: deviceData
    }
    console.log('click');
    const modalRef = this.modalService.open(NewDeviceComponent, {size: 'lg', scrollable: true});
    modalRef.componentInstance.device = device;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });

  }
  addDevice() {
    const device = {
      isEdit: false,
      data: null,
    }
    console.log('click');
    const modalRef = this.modalService.open(NewDeviceComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.device = device;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    // this.modalReference = this.modalService.open(NewDeviceComponent, {size: 'lg', scrollable: true}).result.then((result) => {
    //   this.basicModalCloseResult = "Modal closed" + result;
    //   console.log(this.basicModalCloseResult);
    // }).catch((res) => {});
  }
  addSensor(device) {

    console.log('click');
    const modalRef = this.modalService.open(AddSensorComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.device = device;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });

  }
  removeDevice(){
    Swal.fire({
      title: 'Está eliminando un dispositivo',
      text: '¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Dispositivo eliminado correctamente', icon: 'success'}
        )
      }
    })
  }
}
