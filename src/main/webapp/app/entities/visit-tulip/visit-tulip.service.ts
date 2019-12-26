import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVisitTulip } from 'app/shared/model/visit-tulip.model';

type EntityResponseType = HttpResponse<IVisitTulip>;
type EntityArrayResponseType = HttpResponse<IVisitTulip[]>;

@Injectable({ providedIn: 'root' })
export class VisitTulipService {
  public resourceUrl = SERVER_API_URL + 'api/visits';

  constructor(protected http: HttpClient) {}

  create(visit: IVisitTulip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visit);
    return this.http
      .post<IVisitTulip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(visit: IVisitTulip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visit);
    return this.http
      .put<IVisitTulip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVisitTulip>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVisitTulip[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(visit: IVisitTulip): IVisitTulip {
    const copy: IVisitTulip = Object.assign({}, visit, {
      createdDate: visit.createdDate && visit.createdDate.isValid() ? visit.createdDate.toJSON() : undefined
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
      res.body.forEach((visit: IVisitTulip) => {
        visit.createdDate = visit.createdDate ? moment(visit.createdDate) : undefined;
      });
    }
    return res;
  }
}
