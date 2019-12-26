import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPatientTulip } from 'app/shared/model/patient-tulip.model';
import { PatientTulipService } from './patient-tulip.service';

@Component({
  templateUrl: './patient-tulip-delete-dialog.component.html'
})
export class PatientTulipDeleteDialogComponent {
  patient?: IPatientTulip;

  constructor(protected patientService: PatientTulipService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.patientService.delete(id).subscribe(() => {
      this.eventManager.broadcast('patientListModification');
      this.activeModal.close();
    });
  }
}
