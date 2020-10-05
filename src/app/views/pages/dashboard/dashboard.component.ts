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
  userInfo:any;
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
  public deviceFire: any = [];





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
    this.service.getDataDashboard().subscribe((data) => {
      data.forEach((data: any) => {
        // console.log(data.payload.doc.data());
        this.deviceFire.push( {
          id: data.payload.doc.id,
          data: data.payload.doc.data()
        });
      })
    });
    console.log(this.deviceFire);
  }

  getData() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    setTimeout(() => {
      this.userInfo = JSON.parse(sessionStorage.getItem('user-info'));
        this.devices = this.userInfo;
        this.devicesFilter = this.userInfo;
        this.status.data = true;
        this.status.loading = false
    }, 2000);

  }

  filterByCell(filterValue :any): void {
    this.devices = this.devicesFilter;
    this.devices = this.devices.filter( (item) => {
      return item.nombre.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim());
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
  
  save(values) {
    this.statusSave.loading = true;
    setTimeout(() => {
      this.statusSave.loading = false;
      Swal.fire(
        { toast: true, position: 'bottom-end', showConfirmButton: true, timer: 10000, title: 'Signed in successfully', icon: 'success'}
      );
    }, 3000);
    console.log(values);
  }

}
