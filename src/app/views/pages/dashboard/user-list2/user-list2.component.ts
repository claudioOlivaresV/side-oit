import { DataTable } from 'simple-datatables';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewClientComponent } from '../new-client/new-client.component';
import { NewUserComponent } from '../new-user/new-user.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list2',
  templateUrl: './user-list2.component.html',
  styleUrls: ['./user-list2.component.scss']
})
export class UserList2Component implements OnInit {
  status = {
    data: null,
    loading: null,
    error: null
  }
  users: any[];
  usersFilter: any[];
  myModel:string;
  role: any;

  constructor(private router: Router, private modalService: NgbModal, private service: DevicesService) { }

  ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('user-info')).idRol;
    console.log(this.role);
    if( this.role === 2 || this.role === undefined ) {
      this.router.navigate(['/dashboard'])
    }
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
  remove(userId){
    Swal.fire({
      title: 'Está eliminando un usuario',
      text: '¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const user = {
          option: 'DELETE-USUARIO',
          idUsuario: userId
        }
        console.log(user);
        this.service.deleteUser(user).toPromise().then((rsp: any) => {
          console.log(rsp);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Usuario eliminado correctamente', icon: 'success'}
          )
          this.tryAgain();
        }, err => {
          console.log(err);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Error, intentelo nuevamente',
            icon: 'warning'}
          )
        });
      }
    })
  }
  edit(userInfo){
    const user = {
      isEdit: true,
      data: userInfo,
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
