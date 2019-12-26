import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserRoleTulipUpdateComponent } from 'app/entities/user-role-tulip/user-role-tulip-update.component';
import { UserRoleTulipService } from 'app/entities/user-role-tulip/user-role-tulip.service';
import { UserRoleTulip } from 'app/shared/model/user-role-tulip.model';

describe('Component Tests', () => {
  describe('UserRoleTulip Management Update Component', () => {
    let comp: UserRoleTulipUpdateComponent;
    let fixture: ComponentFixture<UserRoleTulipUpdateComponent>;
    let service: UserRoleTulipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [UserRoleTulipUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserRoleTulipUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRoleTulipUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRoleTulipService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserRoleTulip(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserRoleTulip();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
