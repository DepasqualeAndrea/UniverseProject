import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { format } from 'date-fns';
import { Subscription, forkJoin } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

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
  comment: any;
  userInfo: any;


  postReply(commentId: number, form: NgForm) {
    const content = form.value.content;
    const requestBody = { content: content };
    this.http.commentReply(this.selectedCommentId, requestBody).subscribe(
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
  constructor(private http: CrudService) { }

  ngOnInit(): void {
    this.sub = this.http.getCommentById(this.selectedCommentId).subscribe(comment => {
      this.comment = comment;
      console.log(this.comment);
      const userId = this.comment.usercommentId;
      this.http.getUserById(userId).subscribe(user => {
        this.userInfo = user;
        console.log(this.userInfo);
        this.comment.formattedDate = format(new Date(this.comment.dataCreazione), 'dd MMM yyyy, HH:mm');
      });
    });

  }
}
