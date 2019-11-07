import { ReservationService } from './../../../services/reservation.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: any;
  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.getReservation();
  }
  //
  private getReservation() {
    this.reservationService.get().subscribe(reserv => {
      console.log(reserv);
      this.reservations = reserv;
    });
  }

  // accepting button in the reservation table
  accepted(id, accept) {
    if (id && accept) {
      accept = true;
    }
  }
}
