import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserRoleTulip, UserRoleTulip } from 'app/shared/model/user-role-tulip.model';
import { UserRoleTulipService } from './user-role-tulip.service';
import { UserRoleTulipComponent } from './user-role-tulip.component';
import { UserRoleTulipDetailComponent } from './user-role-tulip-detail.component';
import { UserRoleTulipUpdateComponent } from './user-role-tulip-update.component';

@Injectable({ providedIn: 'root' })
export class UserRoleTulipResolve implements Resolve<IUserRoleTulip> {
  constructor(private service: UserRoleTulipService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserRoleTulip> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userRole: HttpResponse<UserRoleTulip>) => {
          if (userRole.body) {
            return of(userRole.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserRoleTulip());
  }
}

export const userRoleRoute: Routes = [
  {
    path: '',
    component: UserRoleTulipComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.userRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserRoleTulipDetailComponent,
    resolve: {
      userRole: UserRoleTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.userRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserRoleTulipUpdateComponent,
    resolve: {
      userRole: UserRoleTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.userRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserRoleTulipUpdateComponent,
    resolve: {
      userRole: UserRoleTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.userRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
