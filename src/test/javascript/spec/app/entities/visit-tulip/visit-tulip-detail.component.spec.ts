import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VisitTulipDetailComponent } from 'app/entities/visit-tulip/visit-tulip-detail.component';
import { VisitTulip } from 'app/shared/model/visit-tulip.model';

describe('Component Tests', () => {
  describe('VisitTulip Management Detail Component', () => {
    let comp: VisitTulipDetailComponent;
    let fixture: ComponentFixture<VisitTulipDetailComponent>;
    const route = ({ data: of({ visit: new VisitTulip(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VisitTulipDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VisitTulipDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitTulipDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load visit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.visit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
