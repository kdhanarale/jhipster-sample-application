import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';
import { VisitDetailsTulipService } from './visit-details-tulip.service';
import { VisitDetailsTulipDeleteDialogComponent } from './visit-details-tulip-delete-dialog.component';

@Component({
  selector: 'jhi-visit-details-tulip',
  templateUrl: './visit-details-tulip.component.html'
})
export class VisitDetailsTulipComponent implements OnInit, OnDestroy {
  visitDetails?: IVisitDetailsTulip[];
  eventSubscriber?: Subscription;

  constructor(
    protected visitDetailsService: VisitDetailsTulipService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.visitDetailsService.query().subscribe((res: HttpResponse<IVisitDetailsTulip[]>) => {
      this.visitDetails = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVisitDetails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVisitDetailsTulip): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVisitDetails(): void {
    this.eventSubscriber = this.eventManager.subscribe('visitDetailsListModification', () => this.loadAll());
  }

  delete(visitDetails: IVisitDetailsTulip): void {
    const modalRef = this.modalService.open(VisitDetailsTulipDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.visitDetails = visitDetails;
  }
}
