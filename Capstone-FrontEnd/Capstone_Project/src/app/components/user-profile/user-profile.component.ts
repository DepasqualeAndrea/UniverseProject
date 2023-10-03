import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  selectedPostId!: number | any;
  selectedUserId!: number | any;

  modal = {
    showModal: false
  };

  openModal(postId: number, userId: number): void {
    setTimeout(() => {
      this.selectedPostId = postId;
      this.selectedUserId = userId;
      this.modal.showModal = true;
    }, 400)
  }
  closeModal() {
    this.modal.showModal = false;
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  selectedFile: File | null = null;
  sub!: Subscription
  followingsUsers: any[] = [];;
  currentUser: any = {};
  userPosts: any[] = [];

  constructor(private http: CrudService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.sub! = this.http.getFollowings().subscribe(followings => {
      this.followingsUsers = followings
      console.log(this.followingsUsers)
    });

    this.authService.getCurrentUserInfo().subscribe(userInfo => {
      this.currentUser = userInfo;
      console.log(this.currentUser)
      for (let i = 0; i < this.currentUser.posts.length; i++) {
        const posts = this.currentUser.posts[i]
        this.userPosts.push(posts)
      };

    });
  }

  like(postId: number) {
    this.http.LikePost(postId).subscribe(
      (responseMessage: string) => {
        window.location.reload()
        console.log(responseMessage);

      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateUser(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('nome', form.value.nome);
    formData.append('cognome', form.value.cognome);
    formData.append('username', form.value.username);
    formData.append('bio', form.value.bio);
    formData.append('genere', form.value.genere);
    formData.append('citta', form.value.citta);
    formData.append('dataDiNascita', form.value.dataDiNascita);
    this.http.updateUser(this.currentUser.userId, formData).subscribe(
      (response) => {
        console.log('Profilo Modificato Correttamente', response);
        alert('Profilo Modificato Con Successo');
        window.location.reload();
      },
      (error) => {
        console.error('Errore durante le modifiche del profilo', error);
      }
    );

  }

  deleteUser(userId: number) {
    const confirmed = window.confirm('Sei sicuro di voler eliminare il tuo Profilo? \nCosì facendo perderai tutti i dati e dovrai rieffettuare la registrazione, \nVuoi procedere?');

    if (confirmed) {
      this.http.deleteUser(userId).subscribe(() => {

      });
    }
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }






}
