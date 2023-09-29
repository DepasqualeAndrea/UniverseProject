import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-home-pag',
  templateUrl: './home-pag.component.html',
  styleUrls: ['./home-pag.component.scss']
})
export class HomePagComponent implements OnInit {
  @Input() selectedPostId!: number | any;
  @Input() selectedUserId!: number | any;

  modal = {
    showModal: false
  };

  openModal(postId: number, userId: number): void {
    setTimeout(() => {
      this.selectedPostId = postId;
      this.selectedUserId = userId;
      console.log(this.selectedPostId);
      console.log(this.selectedUserId);
      this.modal.showModal = true;
    }, 400)
  }

  closeModal() {
    this.modal.showModal = false;
  }


  @HostListener('mouseenter')
  onMouseEnter() {
    this.isPaused = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isPaused = false;
  }



  searchQuery!: string;
  searchResults: any[] = [];
  /* onSearchInput(event: Event): void {
     this.searchQuery = (event.target as HTMLInputElement).value;
     if (this.searchQuery.trim() !== '') {
       this.http.searchMovies(this.searchQuery).subscribe(
         (searchResults) => {
           this.searchResults = searchResults.results;
           console.log(searchResults)
         },
         (error) => {
           console.error(error);
         }
       );
     } else {
       // Resetta i risultati della ricerca quando l'input è vuoto
       this.searchResults = [];
     }
   }*/
  isPaused = false;
  userPostInfo: any[] = [];
  postImageUrl: any[] = [];
  homePosts: any[] = [];
  content: string = '';
  suggestedUsers: any[] = [];
  userDelays: number[] = [0, 1, 2, 3, 4];
  currentUser: any;



  constructor(private http: CrudService, private authService: AuthService) { }


  ngOnInit(): void {
    this.http.getAllUsersPosts().subscribe(posts => {
      this.homePosts = posts.content;
      const userIds = this.homePosts.map(post => post.userId);
      const userObservables = userIds.map(userId => this.http.getUserById(userId));

      forkJoin(userObservables).subscribe(users => {
        this.homePosts.forEach((post, index) => {
          const user = users[index];
          post.userImage = user.profileImageUrl;
          post.username = user.username;
        });
      });

    });
    this.loadSuggestedUsers();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUserInfo().subscribe(users => {
      this.currentUser = users;
    })
  }

  loadSuggestedUsers(): void {
    this.http.getSuggestedUsers().subscribe(users => {
      this.suggestedUsers = users;
      console.log(this.suggestedUsers);
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


  postComment(postId: number, form: NgForm) {
    const content = form.value.content;
    const requestBody = { content: content };
    this.http.commentPost(postId, requestBody).subscribe(
      (responseMessage: string) => {
        alert('commento pubblicato 🤩')
        window.location.reload();
        console.log(responseMessage);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleFollowing(userId: number, userFollowedId: number){
    this.http.toggleFollowing(userFollowedId, userId).subscribe(
      (responseMessage: string) => {
        window.location.reload();
        console.log(responseMessage);
      },
      (error) => {
        console.error(error);
      }
    )

  }






}
