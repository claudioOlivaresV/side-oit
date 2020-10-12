import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { DevicesService } from 'src/app/services/devices/devices.service';
import Swal from 'sweetalert2';
import { NewClientComponent } from '../new-client/new-client.component';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  role: any;

  constructor(private router: Router, private modalService: NgbModal, private service: DevicesService) { }
  status = {
    data: null,
    loading: null,
    error: null
  }
  clients: any[];
  clientsFilter: any[];
  myModel:string;

  ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('user-info')).idRol;
    if( this.role === 2 || this.role === undefined ) {
      this.router.navigate(['/dashboard'])
    }
    // const dataTable = new DataTable("#dataTableExample");
    this.getData();
  }
  getData() {
    this.status.data = false;
    this.status.loading = true;
    this.status.error = false;
      this.service.getCliente().toPromise().then((rsp: any) => {
        console.log(rsp);
        this.clients = rsp.data;
        this.clientsFilter = rsp.data;
        this.status.data = true;
        this.status.loading = false;
      }, err => {
        console.log(err);
        this.status.error = true;
        this.status.loading = false;
      });
  }

  addClient() {
    const client = {
      isEdit: false,
      data: null,
    }
    const modalRef = this.modalService.open(NewClientComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.client = client;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.tryAgain();
      }
    });

  }
  remove(clientId){
    Swal.fire({
      title: 'Está eliminando un cliente',
      text: '¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const client = {
          option: 'DELETE-CLIENTE',
          idCliente: clientId
        }
        this.service.deleteClient(client).toPromise().then((rsp: any) => {
          console.log(rsp);
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: true, timer: 10000, title: 'Cliente eliminado correctamente', icon: 'success'}
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
  edit(clientInfo){
    const client = {
      isEdit: true,
      data: clientInfo,
    }
    const modalRef = this.modalService.open(NewClientComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.client = client;
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
    this.clients = this.clientsFilter;
    this.clients = this.clientsFilter.filter( (item) => {
      return item.nombre.trim().toLocaleLowerCase().includes(filterValue.toLocaleLowerCase().trim());
  });
  }

}
