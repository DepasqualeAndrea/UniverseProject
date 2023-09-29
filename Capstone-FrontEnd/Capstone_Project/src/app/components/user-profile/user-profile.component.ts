import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { PostInfo } from 'src/app/interface/post-info.interface';
import { Post } from 'src/app/interface/post.interface';
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

  followingsUsers: any[] = [];;
  currentUser: any;
  userPosts: any[] = [];

  constructor(private http: CrudService, private authService: AuthService, ) { }

  ngOnInit(): void {
    this.authService.getCurrentUserInfo().subscribe(userInfo => {
      this.currentUser = userInfo;
      console.log(this.currentUser)

      for (let i = 0; i < this.currentUser.posts.length; i++) {
          const posts = this.currentUser.posts[i]
          this.userPosts.push(posts)
        };

    });

    this.http.getFollowings().subscribe(followings => {
      this.followingsUsers = followings
      console.log(this.followingsUsers)
    })
  }
}
