import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { format } from 'date-fns';
import { Subscription, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';
import { ReplyComponent } from '../reply/reply.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() selectedPostId!: number | any;
  @Input() selectedUserId!: number | any;
  @Input() selectedCommentId!: number | any;
  @Input() selectedReplyId!: number | any;
  @Output() closeModalEvent = new EventEmitter()

  modal = {
    showReplyModal: false
  };


  openModal(commentId: number): void {
    setTimeout(() => {
      this.selectedCommentId = commentId;
      this.modal.showReplyModal = true;
    }, 200)
  }
  onSecondModalClose() {
    this.modal.showReplyModal = false;
  }

  closeModal() {
    this.selectedCommentId = null;
    this.closeModalEvent.emit();
  }


  sub!: Subscription;
  postInfo: any;
  userPostInfo: any;
  postComments: any[] = [];
  userInfos: any[] = [];
  reply: any[] = [];
  formattedDate: string = '';
  commentInput: string = '';
  currentUser: any;
  postUserIdVerify: any;


  constructor(private http: CrudService, private authService: AuthService) { }

  ngOnChanges(): void {


  }

  ngOnInit(): void {
    this.sub! = this.http.getPostById(this.selectedPostId).subscribe((postInfo: any) => {
      this.postInfo = postInfo;
      this.postUserIdVerify = postInfo
      if (this.postInfo) {
        this.http.getUserById(this.postInfo.userId).subscribe((userPostInfo: any) => {
          this.userPostInfo = userPostInfo;
        });
      }
    });


    this.sub! = this.http.getCommentsByPostId(this.selectedPostId).subscribe(comments => {
      this.postComments = comments;
      const userIds = this.postComments.map(comment => comment.usercommentId);
      const userObservables = userIds.map(usercommentId => this.http.getUserById(usercommentId));

      forkJoin(userObservables).subscribe(users => {
        this.userInfos = users;
        this.postComments.forEach((comment) => {
          comment.formattedDate = format(new Date(comment.dataCreazione), 'dd MMM yyyy, HH:mm');
        });

        this.postComments.forEach(comment => {
          this.sub! = this.http.getRepliesByCommentId(comment.commentId).subscribe(replies => {
            comment.replies = replies;
            replies.forEach((reply: { formattedDate: string; dataCreazione: string | number | Date; }) => {
              reply.formattedDate = format(new Date(reply.dataCreazione), 'dd MMM yyyy, HH:mm');


            });
          });
        });
      });
    });
    this.getCurrentUser();

  }

  getCurrentUser() {
    this.authService.getCurrentUserInfo().subscribe(users => {
      this.currentUser = users;
    })
  }

  postComment(postId: number, form: NgForm) {
    const content = form.value.content;
    const requestBody = { content: content };
    this.http.commentPost(postId, requestBody).subscribe(
      (responseMessage: string) => {
        window.location.reload();
        console.log(responseMessage);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  likeComment(commentId: number) {
    this.http.likeComment(commentId).subscribe(
      (responseMessage: string) => {
        window.location.reload();
        console.log(responseMessage);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  likeReply(repliesId: number){
    this.http.likeReply(repliesId).subscribe(
      (responseMessage: string) => {
        window.location.reload();
        console.log(responseMessage );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteReply(repliesId: number){
    const conferma = window.confirm('Sei sicuro di voler eliminare questo Commento?');
    this.http.deleteReply(repliesId).subscribe()
    alert('Commento eliminato ora puoi tornare alla home');
    window.location.reload();
  }

  deleteComment(commentId: number){
    const conferma = window.confirm('Sei sicuro di voler eliminare questo Commento? \n cosi facendo perderai tutte le risposte ricevute');
    this.http.deleteComment(commentId).subscribe()
    alert('Commento eliminato ora puoi tornare alla home');
    window.location.reload();
  }
  deletePost(postId: number){
    const conferma = window.confirm('Vuoi eliminare questo Post? \n tutti i dati andranno persi');
    this.http.deletePost(postId).subscribe()
    alert('Post eliminato ora puoi tornare alla home');
    window.location.reload();
  }


}
















