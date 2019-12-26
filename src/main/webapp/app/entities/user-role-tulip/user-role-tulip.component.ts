import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserRoleTulip } from 'app/shared/model/user-role-tulip.model';
import { UserRoleTulipService } from './user-role-tulip.service';
import { UserRoleTulipDeleteDialogComponent } from './user-role-tulip-delete-dialog.component';

@Component({
  selector: 'jhi-user-role-tulip',
  templateUrl: './user-role-tulip.component.html'
})
export class UserRoleTulipComponent implements OnInit, OnDestroy {
  userRoles?: IUserRoleTulip[];
  eventSubscriber?: Subscription;

  constructor(protected userRoleService: UserRoleTulipService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.userRoleService.query().subscribe((res: HttpResponse<IUserRoleTulip[]>) => {
      this.userRoles = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserRoles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserRoleTulip): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('userRoleListModification', () => this.loadAll());
  }

  delete(userRole: IUserRoleTulip): void {
    const modalRef = this.modalService.open(UserRoleTulipDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userRole = userRole;
  }
}
