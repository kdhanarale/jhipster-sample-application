import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { VisitTulipComponent } from './visit-tulip.component';
import { VisitTulipDetailComponent } from './visit-tulip-detail.component';
import { VisitTulipUpdateComponent } from './visit-tulip-update.component';
import { VisitTulipDeleteDialogComponent } from './visit-tulip-delete-dialog.component';
import { visitRoute } from './visit-tulip.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(visitRoute)],
  declarations: [VisitTulipComponent, VisitTulipDetailComponent, VisitTulipUpdateComponent, VisitTulipDeleteDialogComponent],
  entryComponents: [VisitTulipDeleteDialogComponent]
})
export class JhipsterSampleApplicationVisitTulipModule {}
