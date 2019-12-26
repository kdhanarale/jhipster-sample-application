import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-role-tulip',
        loadChildren: () => import('./user-role-tulip/user-role-tulip.module').then(m => m.JhipsterSampleApplicationUserRoleTulipModule)
      },
      {
        path: 'patient-tulip',
        loadChildren: () => import('./patient-tulip/patient-tulip.module').then(m => m.JhipsterSampleApplicationPatientTulipModule)
      },
      {
        path: 'visit-tulip',
        loadChildren: () => import('./visit-tulip/visit-tulip.module').then(m => m.JhipsterSampleApplicationVisitTulipModule)
      },
      {
        path: 'visit-details-tulip',
        loadChildren: () =>
          import('./visit-details-tulip/visit-details-tulip.module').then(m => m.JhipsterSampleApplicationVisitDetailsTulipModule)
      },
      {
        path: 'attachment-tulip',
        loadChildren: () => import('./attachment-tulip/attachment-tulip.module').then(m => m.JhipsterSampleApplicationAttachmentTulipModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
