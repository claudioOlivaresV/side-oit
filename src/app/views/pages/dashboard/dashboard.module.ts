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
import { NewUserComponent } from './new-user/new-user.component';
import { ClientListComponent } from './client-list/client-list.component';
import { NewClientComponent } from './new-client/new-client.component';
import { GeneralComponent } from './general/general.component';
import { UserList2Component } from './user-list2/user-list2.component';
import { AddSensorComponent } from './add-sensor/add-sensor.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { ChangePasswordComponent } from './change-password/change-password.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddEditSensorTypeComponent } from './add-edit-sensor-type/add-edit-sensor-type.component';
import { ErrorServiceComponent } from './error-service/error-service.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';







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
    component: UserList2Component
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
  declarations: [DashboardComponent, NewDeviceComponent, DeviceListComponent, DeviceDetailComponent, NewUserComponent, ClientListComponent, NewClientComponent, GeneralComponent, UserList2Component, AddSensorComponent, ChangePasswordComponent, AddEditSensorTypeComponent, ErrorServiceComponent, ErrorModalComponent],
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

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    


    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    MatSlideToggleModule
  ],
  bootstrap: [NewDeviceComponent]
})
export class DashboardModule { }
