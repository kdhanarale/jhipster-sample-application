import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPatientTulip, PatientTulip } from 'app/shared/model/patient-tulip.model';
import { PatientTulipService } from './patient-tulip.service';
import { IUserRoleTulip } from 'app/shared/model/user-role-tulip.model';
import { UserRoleTulipService } from 'app/entities/user-role-tulip/user-role-tulip.service';

@Component({
  selector: 'jhi-patient-tulip-update',
  templateUrl: './patient-tulip-update.component.html'
})
export class PatientTulipUpdateComponent implements OnInit {
  isSaving = false;

  userroles: IUserRoleTulip[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    gender: [],
    phone: [],
    address: [],
    city: [],
    pincode: [],
    createdBy: [],
    createdDate: [],
    patient: []
  });

  constructor(
    protected patientService: PatientTulipService,
    protected userRoleService: UserRoleTulipService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.updateForm(patient);

      this.userRoleService
        .query()
        .pipe(
          map((res: HttpResponse<IUserRoleTulip[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUserRoleTulip[]) => (this.userroles = resBody));
    });
  }

  updateForm(patient: IPatientTulip): void {
    this.editForm.patchValue({
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      city: patient.city,
      pincode: patient.pincode,
      createdBy: patient.createdBy,
      createdDate: patient.createdDate != null ? patient.createdDate.format(DATE_TIME_FORMAT) : null,
      patient: patient.patient
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patient = this.createFromForm();
    if (patient.id !== undefined) {
      this.subscribeToSaveResponse(this.patientService.update(patient));
    } else {
      this.subscribeToSaveResponse(this.patientService.create(patient));
    }
  }

  private createFromForm(): IPatientTulip {
    return {
      ...new PatientTulip(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      address: this.editForm.get(['address'])!.value,
      city: this.editForm.get(['city'])!.value,
      pincode: this.editForm.get(['pincode'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdDate:
        this.editForm.get(['createdDate'])!.value != null ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT) : undefined,
      patient: this.editForm.get(['patient'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatientTulip>>): void {
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

  trackById(index: number, item: IUserRoleTulip): any {
    return item.id;
  }
}
