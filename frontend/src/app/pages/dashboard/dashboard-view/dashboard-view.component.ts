import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.dto';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.updateServices();
  }

  onDelete(id: string) {
    this.serviceService.delete(id).subscribe(res => {
      console.log(res);
      this.updateServices();
    });
  }

  private updateServices() {
    this.serviceService.get().subscribe(cars => {
      this.services = cars;
    });
  }
}
