import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { NewClientComponent } from '../new-client/new-client.component';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    // const dataTable = new DataTable("#dataTableExample");
  }

  addClient() {
    const device = {
      isEdit: false,
      data: null,
    }
    console.log('click');
    const modalRef = this.modalService.open(NewClientComponent, {size: 'lg', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.componentInstance.device = device;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });

  }

}
