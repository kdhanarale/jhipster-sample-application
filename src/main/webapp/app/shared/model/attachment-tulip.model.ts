import { Moment } from 'moment';
import { IVisitTulip } from 'app/shared/model/visit-tulip.model';
import { IPatientTulip } from 'app/shared/model/patient-tulip.model';
import { AType } from 'app/shared/model/enumerations/a-type.model';

export interface IAttachmentTulip {
  id?: number;
  type?: AType;
  name?: string;
  dataContentType?: string;
  data?: any;
  createdDate?: Moment;
  vAttachment?: IVisitTulip;
  pAttachment?: IPatientTulip;
}

export class AttachmentTulip implements IAttachmentTulip {
  constructor(
    public id?: number,
    public type?: AType,
    public name?: string,
    public dataContentType?: string,
    public data?: any,
    public createdDate?: Moment,
    public vAttachment?: IVisitTulip,
    public pAttachment?: IPatientTulip
  ) {}
}
