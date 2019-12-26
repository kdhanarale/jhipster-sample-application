import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AttachmentTulipDetailComponent } from 'app/entities/attachment-tulip/attachment-tulip-detail.component';
import { AttachmentTulip } from 'app/shared/model/attachment-tulip.model';

describe('Component Tests', () => {
  describe('AttachmentTulip Management Detail Component', () => {
    let comp: AttachmentTulipDetailComponent;
    let fixture: ComponentFixture<AttachmentTulipDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ attachment: new AttachmentTulip(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [AttachmentTulipDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AttachmentTulipDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttachmentTulipDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load attachment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attachment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
