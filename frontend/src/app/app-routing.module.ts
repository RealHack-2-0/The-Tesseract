import { NewQuestionComponent } from './pages/portal/new-question/new-question.component';
import { ViewQuestionsComponent } from './pages/portal/view-questions/view-questions.component';
import { UserviewComponent } from './pages/user/userview/userview.component';
import { AddEditUserdetailsComponent } from './pages/user/add-edit-userdetails/add-edit-userdetails.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PortalComponent } from './pages/portal/portal.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeGuard } from './auth/home.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { AddEditCarComponent } from './pages/portal/add-edit-car/add-edit-car.component';
import { PortalViewComponent } from './pages/portal/portal-view/portal-view.component';
import { DashboardViewComponent } from './pages/dashboard/dashboard-view/dashboard-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddEditServiceComponent } from './pages/dashboard/add-edit-service/add-edit-service.component';
import { ViewCarComponent } from './pages/portal/view-car/view-car.component';
import { RatingsCommentsComponent } from './pages/portal/ratings-comments/ratings-comments.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', component: UserviewComponent },
      { path: 'edit/:id', component: AddEditUserdetailsComponent }
    ]
  },
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      { path: 'ratings-comments', component: RatingsCommentsComponent },
      { path: 'view-questions', component: ViewQuestionsComponent },
      { path: 'new-question', component: NewQuestionComponent },
      { path: 'car/create', component: AddEditCarComponent },
      { path: 'car/edit/:id', component: AddEditCarComponent },
      { path: '**', component: PortalViewComponent }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardViewComponent },
      { path: 'service/create', component: AddEditServiceComponent },
      { path: 'service/edit/:id', component: AddEditServiceComponent }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [HomeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
