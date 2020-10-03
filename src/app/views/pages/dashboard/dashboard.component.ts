import { Component, OnInit } from '@angular/core';

import { ApexAxisChartSeries, ApexNonAxisChartSeries,
         ApexGrid, ApexChart, ApexXAxis, ApexYAxis, ApexMarkers,
         ApexStroke, ApexLegend, ApexResponsive, ApexTooltip, ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle } from 'ng-apexcharts';

import { NgbDateStruct, NgbCalendar, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// Ng2-charts
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';

// Progressbar.js
import ProgressBar from 'progressbar.js';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  myModel:string;
  modalReference: any;
  basicModalCloseResult = '';
  devices: any[];
  devicesFilter: any [];
  status = {
    data: null,
    loading: null,
    error: null
  }
  statusSave = {
    data: null,
    loading: null,
    error: null
  }





  constructor(private calendar: NgbCalendar,
              private service: DevicesService,
              private router: Router,
              private modalService: NgbModal) {
                
                this.form = new FormGroup({
                  client: new FormControl('', Validators.required),
                  name: new FormControl('', Validators.required),
                  description: new FormControl('', Validators.required),
                  serialNumber: new FormControl('', Validators.required),
                  location: new FormControl('', Validators.required),
                  latitude: new FormControl('', Validators.required),
                  length: new FormControl('', Validators.required),
                  height:new FormControl('', Validators.required),
                  sensors: new FormControl('', Validators.required),
                 })
              }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    setTimeout(() => {
      this.service.getDevices().toPromise().then((rsp: any) => {
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

  filterByCell(filterValue :any): void {
    this.devices = this.devicesFilter;
    this.devices = this.devices.filter( (item) => {
      return item.name.includes(filterValue.toLocaleLowerCase());
    });

    console.log(this.devices);
  }
  goToNewDevice() {
    this.router.navigate(['/dashboard/new-device']);
  }
  goToDeviceDetail() {
    this.router.navigate(['/dashboard/device-detail']);
  }
  openBasicModal(content) {
    this.modalReference = this.modalService.open(content, {size: 'xl', scrollable: true}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
      console.log(this.basicModalCloseResult);
    }).catch((res) => {});
  }
  save(values, modal) {
    this.statusSave.loading = true;
    setTimeout(() => {
      this.statusSave.loading = false;
      modal.close();
      Swal.fire(
        { toast: true, position: 'bottom-end', showConfirmButton: true, timer: 10000, title: 'Signed in successfully', icon: 'success'}
      );
    }, 3000);
    console.log(values);
  }

}
