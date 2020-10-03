import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  form: FormGroup;
  statusSave = {
    data: null,
    loading: null,
    error: null
  }
  modalReference: any;
  basicModalCloseResult = '';


  constructor(private router: Router,  private modalService: NgbModal) {
    this.form = new FormGroup({
      client: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      length: new FormControl('', Validators.required),
      height:new FormControl('', Validators.required),
      sensors: new FormControl('', Validators.required),
     })
   }

  ngOnInit(): void {
    // const dataTable = new DataTable("#dataTableExample");
  }
  goToNewDevice() {
    this.router.navigate(['/dashboard/new-device']);
  }
  openBasicModal(content) {
    console.log('click');
    this.modalReference = this.modalService.open(content, {size: 'lg', scrollable: true}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
      console.log(this.basicModalCloseResult);
    }).catch((res) => {});
  }

  save(values, modal) {
    this.statusSave.loading = true;
    setTimeout(() => {
      this.statusSave.loading = false;
      modal.close();
      Swal.fire(
        { toast: true, position: 'bottom-end', showConfirmButton: true, timer: 10000, title: 'Signed in successfully', icon: 'success'}
      );
    }, 3000);
    console.log(values);
  }
  closeModal(modal){
    this.form.reset();
    modal.close();
  }
  removeDevice(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          { toast: true, position: 'bottom-end', showConfirmButton: true, timer: 10000, title: 'Signed in successfully', icon: 'success'}
        )
      }
    })
  }
}
