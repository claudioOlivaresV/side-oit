import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from 'ng-apexcharts';

// Ng2-charts
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DeviceListComponent } from './device-list/device-list.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'new-device',
    component: NewDeviceComponent
  },
  {
    path: 'device-list',
    component: DeviceListComponent
  }
]

@NgModule({
  declarations: [DashboardComponent, NewDeviceComponent, DeviceListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  bootstrap: [NewDeviceComponent]
})
export class DashboardModule { }
