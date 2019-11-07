import { Component, OnInit, OnChanges } from '@angular/core';
import { User } from 'src/app/services/user.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.current();
  }

  logout() {
    this.authService.signOut();
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}
