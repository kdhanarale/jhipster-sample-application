import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttachmentTulip } from 'app/shared/model/attachment-tulip.model';
import { AttachmentTulipService } from './attachment-tulip.service';

@Component({
  templateUrl: './attachment-tulip-delete-dialog.component.html'
})
export class AttachmentTulipDeleteDialogComponent {
  attachment?: IAttachmentTulip;

  constructor(
    protected attachmentService: AttachmentTulipService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.attachmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('attachmentListModification');
      this.activeModal.close();
    });
  }
}
