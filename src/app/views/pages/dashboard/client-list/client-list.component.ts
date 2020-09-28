import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from 'simple-datatables';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const dataTable = new DataTable("#dataTableExample");
  }

  goToNewClient() {
    this.router.navigate(['/dashboard/new-client']);


  }

}
