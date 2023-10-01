import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { Subscription, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {


  @Input() selectedCommentId!: number | any;
  @Output() closeSecondModalEvent = new EventEmitter();


  commentContent: string = '';

  stopClickPropagation(event: Event) {
    event.stopPropagation();
  }

  closeOnlySecondModal(event: Event) {
    event.stopPropagation();
    this.closeSecondModalEvent.emit();
  }

  sub!: Subscription;
  currentUser: any;
  commentId: number | any;
  replyId: number | any;
  comment: any;
  userInfo: any;


  constructor(private http: CrudService, private router: Router,private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.commentId = params.get('commentId');
        // Verifica il valore di commentId e decide quale chiamata HTTP eseguire
        if (this.commentId) {
          return this.http.getCommentById(this.commentId).pipe(
            switchMap(comment => {
              this.comment = comment;
              const userId = this.comment.usercommentId;
              return this.http.getUserById(userId);
            })
          );
        } else {
          return this.http.getReplyById(this.commentId).pipe(
            switchMap(reply => {
              this.comment = reply;
              const userReplyId = this.comment.usercommentId;
              return this.http.getUserById(userReplyId);
            })
          );
        }
      })
    ).subscribe(user => {
      if (user) {
        this.userInfo = user;
        this.comment.formattedDate = format(new Date(this.comment.dataCreazione), 'dd MMM yyyy, HH:mm');
      } else {
        // Gestisci il caso predefinito o fai qualcosa se l'Observable è vuoto
      }
    });

    // Altri codici comuni
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUserInfo().subscribe(users => {
      this.currentUser = users;
    })
  }


  editComment(commentId: number, form: NgForm) {
    const content = form.value.content;
    const requestBody = { content: content };
    this.http.commentReply(commentId, requestBody).subscribe(
      (responseMessage: string) => {
        alert('Commento Modificato ✅')
        window.location.reload();
        //console.log(responseMessage);
      },
      (error) => {
        console.error(error);
        alert('Non è stato possibile modificare il commento da te selezionato')
      }
    );
  }
}

