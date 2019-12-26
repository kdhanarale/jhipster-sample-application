import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PatientTulipComponent } from './patient-tulip.component';
import { PatientTulipDetailComponent } from './patient-tulip-detail.component';
import { PatientTulipUpdateComponent } from './patient-tulip-update.component';
import { PatientTulipDeleteDialogComponent } from './patient-tulip-delete-dialog.component';
import { patientRoute } from './patient-tulip.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(patientRoute)],
  declarations: [PatientTulipComponent, PatientTulipDetailComponent, PatientTulipUpdateComponent, PatientTulipDeleteDialogComponent],
  entryComponents: [PatientTulipDeleteDialogComponent]
})
export class JhipsterSampleApplicationPatientTulipModule {}
