import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../../pages/dashboard/change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userInfo:any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(sessionStorage.getItem('user-info'));
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    sessionStorage.removeItem('isLoggedin');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user-info');

    if (!sessionStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }
  changePassword(event){
    event.stopPropagation();
    const modalRef = this.modalService.open(ChangePasswordComponent, {size: 'md', scrollable: true,  backdrop: 'static',
    keyboard: false});
    modalRef.result.then((result) => {
      if (result) {
        // this.tryAgain();
      }
    });
  }

}
