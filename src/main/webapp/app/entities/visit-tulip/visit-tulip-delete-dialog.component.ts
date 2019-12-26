import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVisitTulip } from 'app/shared/model/visit-tulip.model';
import { VisitTulipService } from './visit-tulip.service';

@Component({
  templateUrl: './visit-tulip-delete-dialog.component.html'
})
export class VisitTulipDeleteDialogComponent {
  visit?: IVisitTulip;

  constructor(protected visitService: VisitTulipService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('visitListModification');
      this.activeModal.close();
    });
  }
}
