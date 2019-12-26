import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';
import { VisitDetailsTulipService } from './visit-details-tulip.service';

@Component({
  templateUrl: './visit-details-tulip-delete-dialog.component.html'
})
export class VisitDetailsTulipDeleteDialogComponent {
  visitDetails?: IVisitDetailsTulip;

  constructor(
    protected visitDetailsService: VisitDetailsTulipService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visitDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('visitDetailsListModification');
      this.activeModal.close();
    });
  }
}
