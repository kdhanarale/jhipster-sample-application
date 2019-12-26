import { Moment } from 'moment';
import { IPatientTulip } from 'app/shared/model/patient-tulip.model';

export interface IAttachmentTulip {
  id?: number;
  name?: string;
  dataContentType?: string;
  data?: any;
  createdDate?: Moment;
  attachment?: IPatientTulip;
}

export class AttachmentTulip implements IAttachmentTulip {
  constructor(
    public id?: number,
    public name?: string,
    public dataContentType?: string,
    public data?: any,
    public createdDate?: Moment,
    public attachment?: IPatientTulip
  ) {}
}
