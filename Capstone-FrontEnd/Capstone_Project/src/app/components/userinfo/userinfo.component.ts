import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  @Input() selectedPostId!: number | any;
  @Input() selectedUserId!: number | any;
  @Input() selectedCommentId!: number | any;
  @Output() closeModalEvent = new EventEmitter()
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


  User: any;
  currentUser: any;
  userPosts: any[] = [];
  userId!: number | any;
  followers: any[] = [];

  constructor(private http: CrudService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });

    this.http.getUserById(this.userId).subscribe(userInfo => {
      this.User = userInfo;
      console.log(this.User)

      for (let i = 0; i < this.User.posts.length; i++) {
          const posts = this.User.posts[i]
          this.userPosts.push(posts);
        };

    });

    this.authService.getCurrentUserInfo().subscribe(user =>{
      this.currentUser = user;
      console.log(this.currentUser)
    })
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


