import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AttachmentTulipUpdateComponent } from 'app/entities/attachment-tulip/attachment-tulip-update.component';
import { AttachmentTulipService } from 'app/entities/attachment-tulip/attachment-tulip.service';
import { AttachmentTulip } from 'app/shared/model/attachment-tulip.model';

describe('Component Tests', () => {
  describe('AttachmentTulip Management Update Component', () => {
    let comp: AttachmentTulipUpdateComponent;
    let fixture: ComponentFixture<AttachmentTulipUpdateComponent>;
    let service: AttachmentTulipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [AttachmentTulipUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AttachmentTulipUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttachmentTulipUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttachmentTulipService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AttachmentTulip(123);
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
        const entity = new AttachmentTulip();
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
