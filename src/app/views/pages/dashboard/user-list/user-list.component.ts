import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { NewClientComponent } from '../new-client/new-client.component';
import { NewUserComponent } from '../new-user/new-user.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  status = {
    data: null,
    loading: null,
    error: null
  }
  users: any[];
  usersFilter: any[];
  myModel:string;

  constructor(private modalService: NgbModal, private service: DevicesService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
      this.service.getUsers().toPromise().then((rsp: any) => {
        console.log(rsp);
        this.users = rsp.data;
        this.usersFilter = rsp.data;
        this.status.data = true;
        this.status.loading = false;
      }, err => {
        console.log(err);
        this.status.error = true;
        this.status.loading = false;
      });
  }

  add() {
    const user = {
      isEdit: false,
      data: null,
    }
    const modalRef = this.modalService.open(NewUserComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.user = user;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.tryAgain();
      }
    });

  }
  remove(){

  }
  edit(userInfo){
    const user = {
      isEdit: true,
      data: userInfo,
    }
    const modalRef = this.modalService.open(NewClientComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.user = user;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.tryAgain();
      }
    });

  }
  tryAgain() {
    this.status.data = false;
    this.status.loading = false;
    this.status.error = false;
    this.getData();
  }
  filterByCell(filterValue :any): void {
    this.users = this.usersFilter;
    this.users = this.usersFilter.filter( (item) => {
      return item.nombre.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim());
  });
  }


}
