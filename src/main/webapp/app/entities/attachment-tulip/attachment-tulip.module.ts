import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { AttachmentTulipComponent } from './attachment-tulip.component';
import { AttachmentTulipDetailComponent } from './attachment-tulip-detail.component';
import { AttachmentTulipUpdateComponent } from './attachment-tulip-update.component';
import { AttachmentTulipDeleteDialogComponent } from './attachment-tulip-delete-dialog.component';
import { attachmentRoute } from './attachment-tulip.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(attachmentRoute)],
  declarations: [
    AttachmentTulipComponent,
    AttachmentTulipDetailComponent,
    AttachmentTulipUpdateComponent,
    AttachmentTulipDeleteDialogComponent
  ],
  entryComponents: [AttachmentTulipDeleteDialogComponent]
})
export class JhipsterSampleApplicationAttachmentTulipModule {}
