import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAttachmentTulip, AttachmentTulip } from 'app/shared/model/attachment-tulip.model';
import { AttachmentTulipService } from './attachment-tulip.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IPatientTulip } from 'app/shared/model/patient-tulip.model';
import { PatientTulipService } from 'app/entities/patient-tulip/patient-tulip.service';

@Component({
  selector: 'jhi-attachment-tulip-update',
  templateUrl: './attachment-tulip-update.component.html'
})
export class AttachmentTulipUpdateComponent implements OnInit {
  isSaving = false;

  patients: IPatientTulip[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    data: [],
    dataContentType: [],
    createdDate: [],
    attachment: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected attachmentService: AttachmentTulipService,
    protected patientService: PatientTulipService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attachment }) => {
      this.updateForm(attachment);

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

  updateForm(attachment: IAttachmentTulip): void {
    this.editForm.patchValue({
      id: attachment.id,
      name: attachment.name,
      data: attachment.data,
      dataContentType: attachment.dataContentType,
      createdDate: attachment.createdDate != null ? attachment.createdDate.format(DATE_TIME_FORMAT) : null,
      attachment: attachment.attachment
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('jhipsterSampleApplicationApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attachment = this.createFromForm();
    if (attachment.id !== undefined) {
      this.subscribeToSaveResponse(this.attachmentService.update(attachment));
    } else {
      this.subscribeToSaveResponse(this.attachmentService.create(attachment));
    }
  }

  private createFromForm(): IAttachmentTulip {
    return {
      ...new AttachmentTulip(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      dataContentType: this.editForm.get(['dataContentType'])!.value,
      data: this.editForm.get(['data'])!.value,
      createdDate:
        this.editForm.get(['createdDate'])!.value != null ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT) : undefined,
      attachment: this.editForm.get(['attachment'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttachmentTulip>>): void {
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
