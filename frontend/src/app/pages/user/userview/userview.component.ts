import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/user.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.scss']
})
export class UserviewComponent implements OnInit {
  user: User;
  constructor(private userservice: UserService) {}

  capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  ngOnInit() {
    this.user = this.userservice.current();
  }
}
