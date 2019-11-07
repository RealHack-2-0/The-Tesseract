import { RateService } from './../../../services/rate.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/services/rate.dto';
import { Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';

import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-ratings-comments',
  templateUrl: './ratings-comments.component.html',
  styleUrls: ['./ratings-comments.component.scss']
})
export class RatingsCommentsComponent implements OnInit {
  public ratecommentForm = new FormGroup({
    rate: new FormControl(''),
    comment: new FormControl('')
  });
  error: string;
  editId: string;
  rateId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rateService: RateService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(param => param.get('id')),
        tap(id => (this.rateId = id)),
        flatMap(id => this.rateService.get())
      )
      .subscribe(rate => {
        this.rateId = rate;
        console.log(rate);
      });
  }

  onSubmit() {
    const rating: Rate = {
      rate: this.ratecommentForm.controls['rate'].value,
      comment: this.ratecommentForm.controls['comment'].value
    };

    console.log(rating);

    let action: Observable<any>;
    action = this.rateService.create(rating);

    action.subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/portal']);
      },
      err => {
        if (err.error.message) {
          this.error = err.error.message;
        }
      }
    );
  }
}
