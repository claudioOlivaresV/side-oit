import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  public getDevices() {
    // return this.http.get(environment.baseUrl + environment.api.getDevices);
     return this.http.get('./assets/data/devices.json');
  }
  public getDevicesData() {
    // return this.http.get(environment.baseUrl + environment.api.getDevices);
     return this.http.get('./assets/data/devicesData.json');
  }
  public getCliente() {
    // return this.http.get(environment.baseUrl + environment.api.getDevices);
     return this.http.get('./assets/data/clientes.json');
  }
  public getType() {
    // return this.http.get(environment.baseUrl + environment.api.getDevices);
     return this.http.get('./assets/data/dataType.json');
  }
  public getSensorOfDevice() {
    // return this.http.get(environment.baseUrl + environment.api.getDevices);
     return this.http.get('./assets/data/sensorOfDevice.json');
  }
  public getDataDashboard() {
    return this.firestore.collection('side-rasp-pi').snapshotChanges();
  }

}
