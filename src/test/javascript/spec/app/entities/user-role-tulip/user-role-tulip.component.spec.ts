import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserRoleTulipComponent } from 'app/entities/user-role-tulip/user-role-tulip.component';
import { UserRoleTulipService } from 'app/entities/user-role-tulip/user-role-tulip.service';
import { UserRoleTulip } from 'app/shared/model/user-role-tulip.model';

describe('Component Tests', () => {
  describe('UserRoleTulip Management Component', () => {
    let comp: UserRoleTulipComponent;
    let fixture: ComponentFixture<UserRoleTulipComponent>;
    let service: UserRoleTulipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [UserRoleTulipComponent],
        providers: []
      })
        .overrideTemplate(UserRoleTulipComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRoleTulipComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRoleTulipService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserRoleTulip(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userRoles && comp.userRoles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
