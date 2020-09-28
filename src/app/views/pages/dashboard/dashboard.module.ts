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
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ClientListComponent } from './client-list/client-list.component';
import { NewClientComponent } from './new-client/new-client.component';
import { GeneralComponent } from './general/general.component';



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
  },
  {
    path: 'device-detail',
    component: DeviceDetailComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'new-user',
    component: NewUserComponent
  },
  {
    path: 'client-list',
    component: ClientListComponent
  },
  {
    path: 'new-client',
    component: NewClientComponent
  },
  {
    path: 'general',
    component: GeneralComponent
  }
]

@NgModule({
  declarations: [DashboardComponent, NewDeviceComponent, DeviceListComponent, DeviceDetailComponent, NewUserComponent, ClientListComponent, NewClientComponent, GeneralComponent],
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
