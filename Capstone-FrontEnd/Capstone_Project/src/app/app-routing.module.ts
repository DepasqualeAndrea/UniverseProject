import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomePagComponent } from './components/home-pag/home-pag.component';
import { GuardGuard } from './auth/guard.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomePagComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'user', component: UserProfileComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'userInfo/:userId', component: UserinfoComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'editPost/:postId', component: EditPostComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'editComment/:commentId', component: EditCommentComponent,
    canActivate: [GuardGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
