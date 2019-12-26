import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVisitTulip, VisitTulip } from 'app/shared/model/visit-tulip.model';
import { VisitTulipService } from './visit-tulip.service';
import { VisitTulipComponent } from './visit-tulip.component';
import { VisitTulipDetailComponent } from './visit-tulip-detail.component';
import { VisitTulipUpdateComponent } from './visit-tulip-update.component';

@Injectable({ providedIn: 'root' })
export class VisitTulipResolve implements Resolve<IVisitTulip> {
  constructor(private service: VisitTulipService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVisitTulip> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((visit: HttpResponse<VisitTulip>) => {
          if (visit.body) {
            return of(visit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VisitTulip());
  }
}

export const visitRoute: Routes = [
  {
    path: '',
    component: VisitTulipComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.visit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VisitTulipDetailComponent,
    resolve: {
      visit: VisitTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.visit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VisitTulipUpdateComponent,
    resolve: {
      visit: VisitTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.visit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VisitTulipUpdateComponent,
    resolve: {
      visit: VisitTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.visit.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
