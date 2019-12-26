import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserRoleTulipDetailComponent } from 'app/entities/user-role-tulip/user-role-tulip-detail.component';
import { UserRoleTulip } from 'app/shared/model/user-role-tulip.model';

describe('Component Tests', () => {
  describe('UserRoleTulip Management Detail Component', () => {
    let comp: UserRoleTulipDetailComponent;
    let fixture: ComponentFixture<UserRoleTulipDetailComponent>;
    const route = ({ data: of({ userRole: new UserRoleTulip(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [UserRoleTulipDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserRoleTulipDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserRoleTulipDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userRole on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userRole).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
