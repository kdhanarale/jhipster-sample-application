import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVisitTulip } from 'app/shared/model/visit-tulip.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { VisitTulipService } from './visit-tulip.service';
import { VisitTulipDeleteDialogComponent } from './visit-tulip-delete-dialog.component';

@Component({
  selector: 'jhi-visit-tulip',
  templateUrl: './visit-tulip.component.html'
})
export class VisitTulipComponent implements OnInit, OnDestroy {
  visits: IVisitTulip[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected visitService: VisitTulipService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.visits = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.visitService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IVisitTulip[]>) => this.paginateVisits(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.visits = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVisits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVisitTulip): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVisits(): void {
    this.eventSubscriber = this.eventManager.subscribe('visitListModification', () => this.reset());
  }

  delete(visit: IVisitTulip): void {
    const modalRef = this.modalService.open(VisitTulipDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.visit = visit;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateVisits(data: IVisitTulip[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.visits.push(data[i]);
      }
    }
  }
}
