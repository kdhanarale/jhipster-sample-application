import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserRoleTulip } from 'app/shared/model/user-role-tulip.model';

type EntityResponseType = HttpResponse<IUserRoleTulip>;
type EntityArrayResponseType = HttpResponse<IUserRoleTulip[]>;

@Injectable({ providedIn: 'root' })
export class UserRoleTulipService {
  public resourceUrl = SERVER_API_URL + 'api/user-roles';

  constructor(protected http: HttpClient) {}

  create(userRole: IUserRoleTulip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userRole);
    return this.http
      .post<IUserRoleTulip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userRole: IUserRoleTulip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userRole);
    return this.http
      .put<IUserRoleTulip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserRoleTulip>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserRoleTulip[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userRole: IUserRoleTulip): IUserRoleTulip {
    const copy: IUserRoleTulip = Object.assign({}, userRole, {
      createdDate: userRole.createdDate && userRole.createdDate.isValid() ? userRole.createdDate.toJSON() : undefined
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
      res.body.forEach((userRole: IUserRoleTulip) => {
        userRole.createdDate = userRole.createdDate ? moment(userRole.createdDate) : undefined;
      });
    }
    return res;
  }
}
