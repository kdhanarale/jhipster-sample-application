import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PatientTulipDetailComponent } from 'app/entities/patient-tulip/patient-tulip-detail.component';
import { PatientTulip } from 'app/shared/model/patient-tulip.model';

describe('Component Tests', () => {
  describe('PatientTulip Management Detail Component', () => {
    let comp: PatientTulipDetailComponent;
    let fixture: ComponentFixture<PatientTulipDetailComponent>;
    const route = ({ data: of({ patient: new PatientTulip(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PatientTulipDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PatientTulipDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PatientTulipDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load patient on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.patient).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
