import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }
  // dashboard
  public getDevices() {
    // return this.http.get(environment.baseUrl + environment.api.getDevices);
     return this.http.get('./assets/data/devices.json');
  }
  // device maintainer
  public getDevicesData() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.get(environment.baseUrl + environment.api.deviceData, { headers });
  }
  public addDevice(device) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.post(environment.baseUrl + environment.api.deviceData, device, { headers });
  }

  // cliente maintainer
  public getCliente() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.get(environment.baseUrl + environment.api.clienteData, { headers });
  }
  public addCliente(client) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.post(environment.baseUrl + environment.api.clienteData, client, { headers });
  }
   // user maintainer
   public getUsers() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.get(environment.baseUrl + environment.api.userData, { headers });
  }
  public addUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.post(environment.baseUrl + environment.api.userData, user, { headers });
  }
  // sensor services
  public addSensor(sensor) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.post(environment.baseUrl + environment.api.sensorData, sensor, { headers });
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
