import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { UserRoleTulipComponent } from './user-role-tulip.component';
import { UserRoleTulipDetailComponent } from './user-role-tulip-detail.component';
import { UserRoleTulipUpdateComponent } from './user-role-tulip-update.component';
import { UserRoleTulipDeleteDialogComponent } from './user-role-tulip-delete-dialog.component';
import { userRoleRoute } from './user-role-tulip.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(userRoleRoute)],
  declarations: [UserRoleTulipComponent, UserRoleTulipDetailComponent, UserRoleTulipUpdateComponent, UserRoleTulipDeleteDialogComponent],
  entryComponents: [UserRoleTulipDeleteDialogComponent]
})
export class JhipsterSampleApplicationUserRoleTulipModule {}
