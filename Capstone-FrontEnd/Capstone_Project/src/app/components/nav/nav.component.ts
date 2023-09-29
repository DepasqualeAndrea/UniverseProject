import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUser: any;
  imageUrl!: any;

  modal = {
    showModal: false
  };

  openModal() {
    setTimeout(() => {
      this.modal.showModal = true;
    }, 400)
  }
  closeModal() {
    this.modal.showModal = false;
  }


  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit(): void {

    this.authService.getCurrentUserInfo().subscribe(userInfo => {
      this.currentUser = userInfo;
    });

  }

  logout() {
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);
  }
}
