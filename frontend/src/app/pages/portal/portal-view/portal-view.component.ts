import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/services/car.dto';
import { CarService } from 'src/app/services/car.service';
import { updateLocale } from 'moment';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/services/service.dto';

@Component({
  selector: 'app-portal-view',
  templateUrl: './portal-view.component.html',
  styleUrls: ['./portal-view.component.scss']
})
export class PortalViewComponent implements OnInit {

  cars: Car[] = [];
  services: Service[] = [];

  constructor(
    private carService: CarService,
    private serviecService: ServiceService
  ) { }

  ngOnInit() {
    this.carService.get().subscribe(cars => {
      this.cars = cars;
    });
    this.serviecService.get().subscribe(services => {
      this.services = services;
    });
  }

}
