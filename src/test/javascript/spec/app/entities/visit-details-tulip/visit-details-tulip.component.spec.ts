import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VisitDetailsTulipComponent } from 'app/entities/visit-details-tulip/visit-details-tulip.component';
import { VisitDetailsTulipService } from 'app/entities/visit-details-tulip/visit-details-tulip.service';
import { VisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';

describe('Component Tests', () => {
  describe('VisitDetailsTulip Management Component', () => {
    let comp: VisitDetailsTulipComponent;
    let fixture: ComponentFixture<VisitDetailsTulipComponent>;
    let service: VisitDetailsTulipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VisitDetailsTulipComponent],
        providers: []
      })
        .overrideTemplate(VisitDetailsTulipComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VisitDetailsTulipComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VisitDetailsTulipService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new VisitDetailsTulip(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.visitDetails && comp.visitDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
