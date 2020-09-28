import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from 'simple-datatables';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const dataTable = new DataTable("#dataTableExample");
  }
  goToNewUser() {
    this.router.navigate(['/dashboard/new-user']);
  }

}
