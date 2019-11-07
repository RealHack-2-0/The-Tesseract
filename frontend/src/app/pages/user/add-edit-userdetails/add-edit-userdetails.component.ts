import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { first, map, tap, flatMap } from 'rxjs/operators';
import { Service } from 'src/app/services/service.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-userdetails',
  templateUrl: './add-edit-userdetails.component.html',
  styleUrls: ['./add-edit-userdetails.component.scss']
})
export class AddEditUserdetailsComponent implements OnInit {
  public userdetailsForm = new FormGroup({
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    tel: new FormControl(''),
    address: new FormControl('')
  });

  constructor(
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  user: User;
  editId: string;

  ngOnInit() {
    this.user = this.userservice.current();
  }

  onSubmit() {
    this.route.paramMap
      .pipe(
        first(),
        map(param => param.get('id')),
        tap(id => (this.editId = id)),
        flatMap(id => {
          if (id) {
            console.log(id);
            return this.userservice.getById(id);
          } else {
            throw { message: 'No id available' };
          }
        })
      )
      .subscribe(user => {
        console.log(user);
        this.userdetailsForm.setValue({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          tel: user.tel,
          address: user.address
        });
      });
  }

  //Reset the form
  resetForm() {
    this.userdetailsForm.reset();
  }
}
