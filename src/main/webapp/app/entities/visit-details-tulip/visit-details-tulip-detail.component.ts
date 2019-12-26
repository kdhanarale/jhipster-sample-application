import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';

@Component({
  selector: 'jhi-visit-details-tulip-detail',
  templateUrl: './visit-details-tulip-detail.component.html'
})
export class VisitDetailsTulipDetailComponent implements OnInit {
  visitDetails: IVisitDetailsTulip | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitDetails }) => {
      this.visitDetails = visitDetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
