import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) { }

  public getDevices() {
    // return this.http.get(environment.baseUrl + environment.api.getDevices);
     return this.http.get('./assets/data/devices.json');
  }
}
