import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAttachmentTulip } from 'app/shared/model/attachment-tulip.model';

type EntityResponseType = HttpResponse<IAttachmentTulip>;
type EntityArrayResponseType = HttpResponse<IAttachmentTulip[]>;

@Injectable({ providedIn: 'root' })
export class AttachmentTulipService {
  public resourceUrl = SERVER_API_URL + 'api/attachments';

  constructor(protected http: HttpClient) {}

  create(attachment: IAttachmentTulip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(attachment);
    return this.http
      .post<IAttachmentTulip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(attachment: IAttachmentTulip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(attachment);
    return this.http
      .put<IAttachmentTulip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAttachmentTulip>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAttachmentTulip[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(attachment: IAttachmentTulip): IAttachmentTulip {
    const copy: IAttachmentTulip = Object.assign({}, attachment, {
      createdDate: attachment.createdDate && attachment.createdDate.isValid() ? attachment.createdDate.toJSON() : undefined
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
      res.body.forEach((attachment: IAttachmentTulip) => {
        attachment.createdDate = attachment.createdDate ? moment(attachment.createdDate) : undefined;
      });
    }
    return res;
  }
}
