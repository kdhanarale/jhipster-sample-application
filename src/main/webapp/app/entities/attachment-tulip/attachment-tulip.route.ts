import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAttachmentTulip, AttachmentTulip } from 'app/shared/model/attachment-tulip.model';
import { AttachmentTulipService } from './attachment-tulip.service';
import { AttachmentTulipComponent } from './attachment-tulip.component';
import { AttachmentTulipDetailComponent } from './attachment-tulip-detail.component';
import { AttachmentTulipUpdateComponent } from './attachment-tulip-update.component';

@Injectable({ providedIn: 'root' })
export class AttachmentTulipResolve implements Resolve<IAttachmentTulip> {
  constructor(private service: AttachmentTulipService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAttachmentTulip> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((attachment: HttpResponse<AttachmentTulip>) => {
          if (attachment.body) {
            return of(attachment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AttachmentTulip());
  }
}

export const attachmentRoute: Routes = [
  {
    path: '',
    component: AttachmentTulipComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhipsterSampleApplicationApp.attachment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AttachmentTulipDetailComponent,
    resolve: {
      attachment: AttachmentTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.attachment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AttachmentTulipUpdateComponent,
    resolve: {
      attachment: AttachmentTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.attachment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AttachmentTulipUpdateComponent,
    resolve: {
      attachment: AttachmentTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.attachment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
