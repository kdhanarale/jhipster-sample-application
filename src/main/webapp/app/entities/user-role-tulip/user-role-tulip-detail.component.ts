import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserRoleTulip } from 'app/shared/model/user-role-tulip.model';

@Component({
  selector: 'jhi-user-role-tulip-detail',
  templateUrl: './user-role-tulip-detail.component.html'
})
export class UserRoleTulipDetailComponent implements OnInit {
  userRole: IUserRoleTulip | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userRole }) => {
      this.userRole = userRole;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
