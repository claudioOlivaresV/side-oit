import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const dataTable = new DataTable("#dataTableExample");
  }
  goToNewDevice() {
    this.router.navigate(['/dashboard/new-device']);
  }


}
