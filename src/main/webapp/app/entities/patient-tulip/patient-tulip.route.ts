import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPatientTulip, PatientTulip } from 'app/shared/model/patient-tulip.model';
import { PatientTulipService } from './patient-tulip.service';
import { PatientTulipComponent } from './patient-tulip.component';
import { PatientTulipDetailComponent } from './patient-tulip-detail.component';
import { PatientTulipUpdateComponent } from './patient-tulip-update.component';

@Injectable({ providedIn: 'root' })
export class PatientTulipResolve implements Resolve<IPatientTulip> {
  constructor(private service: PatientTulipService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPatientTulip> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((patient: HttpResponse<PatientTulip>) => {
          if (patient.body) {
            return of(patient.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PatientTulip());
  }
}

export const patientRoute: Routes = [
  {
    path: '',
    component: PatientTulipComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.patient.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PatientTulipDetailComponent,
    resolve: {
      patient: PatientTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.patient.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PatientTulipUpdateComponent,
    resolve: {
      patient: PatientTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.patient.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PatientTulipUpdateComponent,
    resolve: {
      patient: PatientTulipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.patient.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
