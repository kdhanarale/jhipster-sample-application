import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IUserRoleTulip, UserRoleTulip } from 'app/shared/model/user-role-tulip.model';
import { UserRoleTulipService } from './user-role-tulip.service';

@Component({
  selector: 'jhi-user-role-tulip-update',
  templateUrl: './user-role-tulip-update.component.html'
})
export class UserRoleTulipUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    type: [],
    firstName: [],
    lastName: [],
    createdBy: [],
    createdDate: []
  });

  constructor(protected userRoleService: UserRoleTulipService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userRole }) => {
      this.updateForm(userRole);
    });
  }

  updateForm(userRole: IUserRoleTulip): void {
    this.editForm.patchValue({
      id: userRole.id,
      type: userRole.type,
      firstName: userRole.firstName,
      lastName: userRole.lastName,
      createdBy: userRole.createdBy,
      createdDate: userRole.createdDate != null ? userRole.createdDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userRole = this.createFromForm();
    if (userRole.id !== undefined) {
      this.subscribeToSaveResponse(this.userRoleService.update(userRole));
    } else {
      this.subscribeToSaveResponse(this.userRoleService.create(userRole));
    }
  }

  private createFromForm(): IUserRoleTulip {
    return {
      ...new UserRoleTulip(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdDate:
        this.editForm.get(['createdDate'])!.value != null ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRoleTulip>>): void {
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
}
