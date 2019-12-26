import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserRoleTulip } from 'app/shared/model/user-role-tulip.model';
import { UserRoleTulipService } from './user-role-tulip.service';

@Component({
  templateUrl: './user-role-tulip-delete-dialog.component.html'
})
export class UserRoleTulipDeleteDialogComponent {
  userRole?: IUserRoleTulip;

  constructor(
    protected userRoleService: UserRoleTulipService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userRoleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userRoleListModification');
      this.activeModal.close();
    });
  }
}
