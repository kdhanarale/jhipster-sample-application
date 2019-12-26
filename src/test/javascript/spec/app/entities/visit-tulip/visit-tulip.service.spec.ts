import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { VisitTulipService } from 'app/entities/visit-tulip/visit-tulip.service';
import { IVisitTulip, VisitTulip } from 'app/shared/model/visit-tulip.model';
import { ScheduleStatus } from 'app/shared/model/enumerations/schedule-status.model';

describe('Service Tests', () => {
  describe('VisitTulip Service', () => {
    let injector: TestBed;
    let service: VisitTulipService;
    let httpMock: HttpTestingController;
    let elemDefault: IVisitTulip;
    let expectedResult: IVisitTulip | IVisitTulip[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(VisitTulipService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new VisitTulip(0, currentDate, ScheduleStatus.REQUESTED, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            scheduleDate: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a VisitTulip', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            scheduleDate: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            scheduleDate: currentDate,
            createdDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new VisitTulip())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a VisitTulip', () => {
        const returnedFromService = Object.assign(
          {
            scheduleDate: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            createdDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            scheduleDate: currentDate,
            createdDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of VisitTulip', () => {
        const returnedFromService = Object.assign(
          {
            scheduleDate: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            createdDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            scheduleDate: currentDate,
            createdDate: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a VisitTulip', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
