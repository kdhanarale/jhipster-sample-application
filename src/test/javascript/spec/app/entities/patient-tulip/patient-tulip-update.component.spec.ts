import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PatientTulipUpdateComponent } from 'app/entities/patient-tulip/patient-tulip-update.component';
import { PatientTulipService } from 'app/entities/patient-tulip/patient-tulip.service';
import { PatientTulip } from 'app/shared/model/patient-tulip.model';

describe('Component Tests', () => {
  describe('PatientTulip Management Update Component', () => {
    let comp: PatientTulipUpdateComponent;
    let fixture: ComponentFixture<PatientTulipUpdateComponent>;
    let service: PatientTulipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PatientTulipUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PatientTulipUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PatientTulipUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PatientTulipService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PatientTulip(123);
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
        const entity = new PatientTulip();
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
