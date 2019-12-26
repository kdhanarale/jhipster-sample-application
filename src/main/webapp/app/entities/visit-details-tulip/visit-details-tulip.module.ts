import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { VisitDetailsTulipComponent } from './visit-details-tulip.component';
import { VisitDetailsTulipDetailComponent } from './visit-details-tulip-detail.component';
import { VisitDetailsTulipUpdateComponent } from './visit-details-tulip-update.component';
import { VisitDetailsTulipDeleteDialogComponent } from './visit-details-tulip-delete-dialog.component';
import { visitDetailsRoute } from './visit-details-tulip.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(visitDetailsRoute)],
  declarations: [
    VisitDetailsTulipComponent,
    VisitDetailsTulipDetailComponent,
    VisitDetailsTulipUpdateComponent,
    VisitDetailsTulipDeleteDialogComponent
  ],
  entryComponents: [VisitDetailsTulipDeleteDialogComponent]
})
export class JhipsterSampleApplicationVisitDetailsTulipModule {}
