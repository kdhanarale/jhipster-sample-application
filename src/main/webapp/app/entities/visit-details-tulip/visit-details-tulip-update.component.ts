import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IVisitDetailsTulip, VisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';
import { VisitDetailsTulipService } from './visit-details-tulip.service';
import { IVisitTulip } from 'app/shared/model/visit-tulip.model';
import { VisitTulipService } from 'app/entities/visit-tulip/visit-tulip.service';

@Component({
  selector: 'jhi-visit-details-tulip-update',
  templateUrl: './visit-details-tulip-update.component.html'
})
export class VisitDetailsTulipUpdateComponent implements OnInit {
  isSaving = false;

  visits: IVisitTulip[] = [];

  editForm = this.fb.group({
    id: [],
    type: [],
    data: [],
    createdDate: [],
    visitDetails: []
  });

  constructor(
    protected visitDetailsService: VisitDetailsTulipService,
    protected visitService: VisitTulipService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitDetails }) => {
      this.updateForm(visitDetails);

      this.visitService
        .query()
        .pipe(
          map((res: HttpResponse<IVisitTulip[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IVisitTulip[]) => (this.visits = resBody));
    });
  }

  updateForm(visitDetails: IVisitDetailsTulip): void {
    this.editForm.patchValue({
      id: visitDetails.id,
      type: visitDetails.type,
      data: visitDetails.data,
      createdDate: visitDetails.createdDate != null ? visitDetails.createdDate.format(DATE_TIME_FORMAT) : null,
      visitDetails: visitDetails.visitDetails
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const visitDetails = this.createFromForm();
    if (visitDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.visitDetailsService.update(visitDetails));
    } else {
      this.subscribeToSaveResponse(this.visitDetailsService.create(visitDetails));
    }
  }

  private createFromForm(): IVisitDetailsTulip {
    return {
      ...new VisitDetailsTulip(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      data: this.editForm.get(['data'])!.value,
      createdDate:
        this.editForm.get(['createdDate'])!.value != null ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT) : undefined,
      visitDetails: this.editForm.get(['visitDetails'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitDetailsTulip>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IVisitTulip): any {
    return item.id;
  }
}
