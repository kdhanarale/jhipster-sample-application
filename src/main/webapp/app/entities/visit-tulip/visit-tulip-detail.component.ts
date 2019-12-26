import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisitTulip } from 'app/shared/model/visit-tulip.model';

@Component({
  selector: 'jhi-visit-tulip-detail',
  templateUrl: './visit-tulip-detail.component.html'
})
export class VisitTulipDetailComponent implements OnInit {
  visit: IVisitTulip | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visit }) => {
      this.visit = visit;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
