import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Car } from 'src/app/services/car.dto';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, flatMap, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss']
})
export class AddEditCarComponent implements OnInit {

  public carForm = new FormGroup({
    vendor: new FormControl(''),
    model: new FormControl(''),
    number: new FormControl(''),
    milage: new FormControl('')
  });

  editId: string;

  error: string;
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      first(),
      map(param => param.get('id')),
      tap(id => this.editId = id),
      flatMap(id => {
        if (id) {
          console.log(id);
          return this.carService.getById(id);
        } else {
          throw { message: 'No id available'};
        }
      })
    ).subscribe(car => {
      this.carForm.setValue({
        vendor: car.vendor,
        model: car.model,
        number: car.number,
        milage: car.milage
      });
    });
  }

  onSubmit() {
    this.loading = true;
    const car: Car = {
      vendor: this.carForm.controls['vendor'].value,
      model: this.carForm.controls['model'].value,
      number: this.carForm.controls['number'].value,
      milage: this.carForm.controls['milage'].value
    };
    let action: Observable<any>;
    if (this.editId) {
      action = this.carService.update(this.editId, car);
    } else {
      action = this.carService.create(car);
    }
    action.subscribe(res => {
      console.log(res);
      this.router.navigate(['/portal']);
    }, err => {
      this.loading = false;
      if (err.error.message) {
        this.error = err.error.message;
      }
    });
  }

}
