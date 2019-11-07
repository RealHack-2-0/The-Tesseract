import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { httpInterceptorProviders } from './auth/auth.interceptor';
import { PortalComponent } from './pages/portal/portal.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AddEditCarComponent } from './pages/portal/add-edit-car/add-edit-car.component';
import { PortalViewComponent } from './pages/portal/portal-view/portal-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardViewComponent } from './pages/dashboard/dashboard-view/dashboard-view.component';
import { AddEditServiceComponent } from './pages/dashboard/add-edit-service/add-edit-service.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ViewCarComponent } from './pages/portal/view-car/view-car.component';
import { AddEditReservationComponent } from './pages/reservation/add-edit-reservation/add-edit-reservation.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';

import { ReservationsComponent } from './pages/dashboard/reservations/reservations.component';
import { AddEditUserdetailsComponent } from './pages/user/add-edit-userdetails/add-edit-userdetails.component';
import { UserviewComponent } from './pages/user/userview/userview.component';
import { RatingsComponent } from './pages/portal/ratings/ratings.component';
import { RatingsCommentsComponent } from './pages/portal/ratings-comments/ratings-comments.component';
import { OverallRatingComponent } from './pages/dashboard/overall-rating/overall-rating.component';
import { ViewQuestionsComponent } from './pages/portal/view-questions/view-questions.component';
import { QuestionComponent } from './pages/portal/question/question.component';
import { NewQuestionComponent } from './pages/portal/new-question/new-question.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PortalComponent,
    HomeComponent,
    SignupComponent,
    AddEditCarComponent,
    PortalViewComponent,
    DashboardComponent,
    DashboardViewComponent,
    AddEditServiceComponent,
    FooterComponent,
    UserComponent,
    AdminComponent,
    ViewCarComponent,
    AddEditReservationComponent,
    ReservationComponent,
    UserprofileComponent,
    ReservationsComponent,
    AddEditUserdetailsComponent,
    UserviewComponent,
    RatingsComponent,
    RatingsCommentsComponent,
    OverallRatingComponent,
    ViewQuestionsComponent,
    QuestionComponent,
    NewQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AuthModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
