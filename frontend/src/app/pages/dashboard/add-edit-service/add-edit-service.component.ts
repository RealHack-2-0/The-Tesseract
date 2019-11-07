import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { first, map, tap, flatMap } from 'rxjs/operators';
import { Service } from 'src/app/services/service.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-service',
  templateUrl: './add-edit-service.component.html',
  styleUrls: ['./add-edit-service.component.scss']
})
export class AddEditServiceComponent implements OnInit {
  public serviceForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('')
  });

  editId: string;

  error: string;
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        first(),
        map(param => param.get('id')),
        tap(id => (this.editId = id)),
        flatMap(id => {
          if (id) {
            console.log(id);
            return this.serviceService.getById(id);
          } else {
            throw { message: 'No id available' };
          }
        })
      )
      .subscribe(service => {
        this.serviceForm.setValue({
          name: service.name,
          description: service.description,
          price: service.price
        });
      });
  }

  onSubmit() {
    this.loading = true;
    const service: Service = {
      name: this.serviceForm.controls['name'].value,
      description: this.serviceForm.controls['description'].value,
      price: this.serviceForm.controls['price'].value
    };
    let action: Observable<any>;
    if (this.editId) {
      action = this.serviceService.update(this.editId, service);
    } else {
      action = this.serviceService.create(service);
    }
    action.subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.loading = false;
        if (err.error.message) {
          this.error = err.error.message;
        }
      }
    );
  }
}
