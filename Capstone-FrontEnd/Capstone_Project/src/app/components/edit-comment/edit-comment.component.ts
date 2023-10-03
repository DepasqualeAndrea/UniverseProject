import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
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
  comment: any = {};
  userInfo: any;
  formattedDate: string = '';



  constructor(private http: CrudService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.commentId = params.get('commentId');
      this.replyId = params.get('replyId');

      if (this.commentId) {
        this.handleCommentId();
      } else if (this.replyId) {
        this.handleReplyId();
      } else {
        console.error('Nessun parametro definito');
      }
    })

    this.getCurrentUser()
  }



  private handleCommentId() {
    this.http.getCommentById(this.commentId).subscribe((comment: any) => {
      this.comment = comment;
      this.comment.formattedDate = format(new Date(this.comment.dataCreazione), 'dd MMM yyyy, HH:mm');
      this.sub! = this.http.getUserById(this.comment.usercommentId).subscribe((userPostInfo: any) => {
        this.userInfo = userPostInfo;
      });
    });
  }

  private handleReplyId() {
    this.http.getReplyById(this.replyId).subscribe(reply => {
      this.comment = reply;
      this.comment.formattedDate = format(new Date(this.comment.dataCreazione), 'dd MMM yyyy, HH:mm');
      this.sub! = this.http.getUserById(this.comment.usercommentId).subscribe((userPostInfo: any) => {
        this.userInfo = userPostInfo;
      });

    });
  }

  getCurrentUser() {
    this.authService.getCurrentUserInfo().subscribe(users => {
      this.currentUser = users;
    })
  }

  edit(commentId: number, replyId: number, form: NgForm) {
    const content = form.value.content;
    const requestBody = { content: content };

    if (commentId) {
      this.http.updateComment(commentId, requestBody).subscribe(
        (responseMessage: string) => {
          alert('Commento Modificato ✅')
          window.location.reload();
        },
        (error) => {
          console.error(error);
          alert('Non è stato possibile modificare il commento da te selezionato')
        }
      );
      this.router.navigate(['/home'])
    } else if (replyId) {

      this.http.updateReply(replyId, requestBody).subscribe(
        (responseMessage: string) => {
          alert('Commento Modificato ✅')
        },
        (error) => {
          console.error(error);
          alert('Non è stato possibile modificare il commento da te selezionato')
        }
      )
      this.router.navigate(['/home'])
    }

  }



}

