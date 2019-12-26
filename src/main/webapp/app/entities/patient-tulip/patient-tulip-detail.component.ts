import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPatientTulip } from 'app/shared/model/patient-tulip.model';

@Component({
  selector: 'jhi-patient-tulip-detail',
  templateUrl: './patient-tulip-detail.component.html'
})
export class PatientTulipDetailComponent implements OnInit {
  patient: IPatientTulip | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.patient = patient;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
