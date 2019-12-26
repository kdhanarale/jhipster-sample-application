import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VisitTulipUpdateComponent } from 'app/entities/visit-tulip/visit-tulip-update.component';
import { VisitTulipService } from 'app/entities/visit-tulip/visit-tulip.service';
import { VisitTulip } from 'app/shared/model/visit-tulip.model';

describe('Component Tests', () => {
  describe('VisitTulip Management Update Component', () => {
    let comp: VisitTulipUpdateComponent;
    let fixture: ComponentFixture<VisitTulipUpdateComponent>;
    let service: VisitTulipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VisitTulipUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VisitTulipUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VisitTulipUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VisitTulipService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VisitTulip(123);
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
        const entity = new VisitTulip();
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
