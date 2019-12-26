import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IVisitTulip, VisitTulip } from 'app/shared/model/visit-tulip.model';
import { VisitTulipService } from './visit-tulip.service';
import { IPatientTulip } from 'app/shared/model/patient-tulip.model';
import { PatientTulipService } from 'app/entities/patient-tulip/patient-tulip.service';

@Component({
  selector: 'jhi-visit-tulip-update',
  templateUrl: './visit-tulip-update.component.html'
})
export class VisitTulipUpdateComponent implements OnInit {
  isSaving = false;

  patients: IPatientTulip[] = [];

  editForm = this.fb.group({
    id: [],
    diagnosis: [],
    prescription: [],
    clinicalHistory: [],
    postalCode: [],
    city: [],
    state: [],
    createdDate: [],
    visit: []
  });

  constructor(
    protected visitService: VisitTulipService,
    protected patientService: PatientTulipService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visit }) => {
      this.updateForm(visit);

      this.patientService
        .query()
        .pipe(
          map((res: HttpResponse<IPatientTulip[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPatientTulip[]) => (this.patients = resBody));
    });
  }

  updateForm(visit: IVisitTulip): void {
    this.editForm.patchValue({
      id: visit.id,
      diagnosis: visit.diagnosis,
      prescription: visit.prescription,
      clinicalHistory: visit.clinicalHistory,
      postalCode: visit.postalCode,
      city: visit.city,
      state: visit.state,
      createdDate: visit.createdDate != null ? visit.createdDate.format(DATE_TIME_FORMAT) : null,
      visit: visit.visit
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const visit = this.createFromForm();
    if (visit.id !== undefined) {
      this.subscribeToSaveResponse(this.visitService.update(visit));
    } else {
      this.subscribeToSaveResponse(this.visitService.create(visit));
    }
  }

  private createFromForm(): IVisitTulip {
    return {
      ...new VisitTulip(),
      id: this.editForm.get(['id'])!.value,
      diagnosis: this.editForm.get(['diagnosis'])!.value,
      prescription: this.editForm.get(['prescription'])!.value,
      clinicalHistory: this.editForm.get(['clinicalHistory'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      state: this.editForm.get(['state'])!.value,
      createdDate:
        this.editForm.get(['createdDate'])!.value != null ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT) : undefined,
      visit: this.editForm.get(['visit'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitTulip>>): void {
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

  trackById(index: number, item: IPatientTulip): any {
    return item.id;
  }
}
