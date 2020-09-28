import { DataTable } from 'simple-datatables';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list2',
  templateUrl: './user-list2.component.html',
  styleUrls: ['./user-list2.component.scss']
})
export class UserList2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const dataTable = new DataTable("#dataTableExample");
  }
  goToNewUser() {
    this.router.navigate(['/dashboard/new-user']);
  }

}
