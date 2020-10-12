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
  public sensorFire: any = [];
  idUser:any;
  logIds = ['12345678', '23456789']





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
    this.idUser = JSON.parse(sessionStorage.getItem('user-info')).datosUsuario.idCliente;
    this.getData(this.idUser);
  

  }
  compareDevice() {
    this.devices.forEach((element, index) => {
      this.sensorFire.forEach(elementFire => {
        if(element.numeroSerie !== elementFire.serie){
          this.sensorFire.splice(index, 1)
        }
      });
    });
  }
  getDataFire(){
    
    this.service.getDataDashboard().subscribe((data) => {
      data.forEach((data: any) => {

        console.log(data.payload.doc.data());
        

        this.devices.forEach(element => {
          if(element.numeroSerie === data.payload.doc.data().data.serie){
            const unix = (parseInt(data.payload.doc.data().data.timestamp) * 1000) ;
            const dateObject = new Date(unix)
            console.log(dateObject);
            element.date = dateObject;
            console.log(data.payload.doc.data().data.sensores);
            // element.sensores = data.payload.doc.data().data.sensores;

            data.payload.doc.data().data.sensores.forEach(elementInt => {
              const index = element.sensor.map(function(e) { return e.prefijo; }).indexOf((elementInt.nombre));
              console.log(index);
              if(index >= 0){
                console.log('actulizando');
                
                element.sensor[index].valor = elementInt.valor
              }

            });
            // const date = new Date( unix  * 1000).toISOString().slice(0, 20);
            // console.log(date);
              // this.sensorFire.push(data.payload.doc.data());
              
              
            }
        });
      })
    });
 


  }

  getData(idClient) {
    const device = {
      option: "OBTENER-DISPOSITIVO-POR-ID-CLIENTE",
      idCliente: idClient
  }
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
    this.service.getDevices(device).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.devices = rsp.data;
      this.devicesFilter = rsp.data;
      this.getDataFire();
      this.status.data = true;
      this.status.loading = false;
    }, err => {
      console.log(err);
      this.status.error = true;
      this.status.loading = false;
    });
    // setTimeout(() => {
    //   this.userInfo = JSON.parse(sessionStorage.getItem('user-info'));
    //     this.devices = this.userInfo.data;
    //     this.devicesFilter = this.userInfo.data;
    //     this.status.data = true;
    //     this.status.loading = false
    // }, 2000);

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
      this.basicModalCloseResult = 'Modal closed' + result;
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
