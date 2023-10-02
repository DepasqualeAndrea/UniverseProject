import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  @Input() selectedPostId!: number | any;
  @Output() closeSecondModalEvent = new EventEmitter();

  sub!: Subscription;
  userInfo: any;
  postId!: number | any;
  post: any = {};
  userPostInfo: any;
  currentUser: any;

  constructor(private route: ActivatedRoute, private http: CrudService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId');
      console.log(this.postId);
    });
    this.sub! = this.http.getPostById(this.postId).subscribe((postInfo: any) => {
      this.post = postInfo;
      console.log(this.post);
      if (this.post) {
        this.http.getUserById(this.post.userId).subscribe((userPostInfo: any) => {
          this.userPostInfo = userPostInfo;
        });
      }
    });
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.authService.getCurrentUserInfo().subscribe(users => {
      this.currentUser = users;
    })
  }

  modificaPost(form: NgForm): void {

    const conferma = window.confirm('Rendere Definitive Le modifiche del Post?');
    const formData = new FormData();
    formData.append('description', form.value.description);

    this.http.modificaPost(formData, this.postId).subscribe(
      (response: any) => {
        console.log('Post Modificato Correttamente', response);
        alert('Perfetto ora puoi tornare alla home');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Errore durante la pubblicazione del Post', error);
      }
    );
  }


}



