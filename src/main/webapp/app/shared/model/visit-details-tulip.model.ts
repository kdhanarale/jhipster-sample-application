import { Moment } from 'moment';
import { IVisitTulip } from 'app/shared/model/visit-tulip.model';
import { VisitInfo } from 'app/shared/model/enumerations/visit-info.model';

export interface IVisitDetailsTulip {
  id?: number;
  type?: VisitInfo;
  data?: string;
  createdDate?: Moment;
  visitDetails?: IVisitTulip;
}

export class VisitDetailsTulip implements IVisitDetailsTulip {
  constructor(
    public id?: number,
    public type?: VisitInfo,
    public data?: string,
    public createdDate?: Moment,
    public visitDetails?: IVisitTulip
  ) {}
}
