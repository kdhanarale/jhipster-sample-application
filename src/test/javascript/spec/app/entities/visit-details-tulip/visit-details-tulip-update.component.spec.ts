import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VisitDetailsTulipUpdateComponent } from 'app/entities/visit-details-tulip/visit-details-tulip-update.component';
import { VisitDetailsTulipService } from 'app/entities/visit-details-tulip/visit-details-tulip.service';
import { VisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';

describe('Component Tests', () => {
  describe('VisitDetailsTulip Management Update Component', () => {
    let comp: VisitDetailsTulipUpdateComponent;
    let fixture: ComponentFixture<VisitDetailsTulipUpdateComponent>;
    let service: VisitDetailsTulipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VisitDetailsTulipUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VisitDetailsTulipUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VisitDetailsTulipUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VisitDetailsTulipService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VisitDetailsTulip(123);
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
        const entity = new VisitDetailsTulip();
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
