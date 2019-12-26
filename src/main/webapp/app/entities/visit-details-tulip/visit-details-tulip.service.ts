import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';

type EntityResponseType = HttpResponse<IVisitDetailsTulip>;
type EntityArrayResponseType = HttpResponse<IVisitDetailsTulip[]>;

@Injectable({ providedIn: 'root' })
export class VisitDetailsTulipService {
  public resourceUrl = SERVER_API_URL + 'api/visit-details';

  constructor(protected http: HttpClient) {}

  create(visitDetails: IVisitDetailsTulip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitDetails);
    return this.http
      .post<IVisitDetailsTulip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(visitDetails: IVisitDetailsTulip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitDetails);
    return this.http
      .put<IVisitDetailsTulip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVisitDetailsTulip>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVisitDetailsTulip[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(visitDetails: IVisitDetailsTulip): IVisitDetailsTulip {
    const copy: IVisitDetailsTulip = Object.assign({}, visitDetails, {
      createdDate: visitDetails.createdDate && visitDetails.createdDate.isValid() ? visitDetails.createdDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((visitDetails: IVisitDetailsTulip) => {
        visitDetails.createdDate = visitDetails.createdDate ? moment(visitDetails.createdDate) : undefined;
      });
    }
    return res;
  }
}
