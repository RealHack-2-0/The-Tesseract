import { RateService } from 'src/app/services/rate.service';
import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/services/rate.dto';

@Component({
  selector: 'app-overall-rating',
  templateUrl: './overall-rating.component.html',
  styleUrls: ['./overall-rating.component.scss']
})
export class OverallRatingComponent implements OnInit {
  constructor(private rateService: RateService) {}

  rate: Rate[] = [];
  avg: any = 0;
  tot: any = 0;
  num: any = 0;

  ngOnInit() {
    this.rateService.get().subscribe(rate => {
      this.rate = rate;
      this.rate.forEach(element => (this.tot = this.tot + element.rate));
      this.rate.forEach(t => (this.num = this.num + 1));
      this.avg = this.tot / this.num;
    });
  }
}
