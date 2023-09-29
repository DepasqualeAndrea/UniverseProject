import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal = false;
  showPostModal = false;
  showReplyModal = false;
  constructor() { }
}
