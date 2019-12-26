import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VisitDetailsTulipDetailComponent } from 'app/entities/visit-details-tulip/visit-details-tulip-detail.component';
import { VisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';

describe('Component Tests', () => {
  describe('VisitDetailsTulip Management Detail Component', () => {
    let comp: VisitDetailsTulipDetailComponent;
    let fixture: ComponentFixture<VisitDetailsTulipDetailComponent>;
    const route = ({ data: of({ visitDetails: new VisitDetailsTulip(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VisitDetailsTulipDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VisitDetailsTulipDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitDetailsTulipDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load visitDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.visitDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
