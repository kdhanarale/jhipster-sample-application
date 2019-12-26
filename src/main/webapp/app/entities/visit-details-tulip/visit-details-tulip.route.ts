import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVisitDetailsTulip, VisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';
import { VisitDetailsTulipService } from './visit-details-tulip.service';
import { VisitDetailsTulipComponent } from './visit-details-tulip.component';
import { VisitDetailsTulipDetailComponent } from './visit-details-tulip-detail.component';
import { VisitDetailsTulipUpdateComponent } from './visit-details-tulip-update.component';

@Injectable({ providedIn: 'root' })
export class VisitDetailsTulipResolve implements Resolve<IVisitDetailsTulip> {
  constructor(private service: VisitDetailsTulipService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVisitDetailsTulip> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((visitDetails: HttpResponse<VisitDetailsTulip>) => {
          if (visitDetails.body) {
            return of(visitDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VisitDetailsTulip());
  }
}

export const visitDetailsRoute: Routes = [
  {
    path: '',
    component: VisitDetailsTulipComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.visitDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VisitDetailsTulipDetailComponent,
    resolve: {
      visitDetails: VisitDetailsTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.visitDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VisitDetailsTulipUpdateComponent,
    resolve: {
      visitDetails: VisitDetailsTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.visitDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VisitDetailsTulipUpdateComponent,
    resolve: {
      visitDetails: VisitDetailsTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.visitDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
