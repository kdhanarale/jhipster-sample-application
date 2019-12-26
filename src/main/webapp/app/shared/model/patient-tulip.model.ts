import { Moment } from 'moment';
import { IVisitTulip } from 'app/shared/model/visit-tulip.model';
import { IAttachmentTulip } from 'app/shared/model/attachment-tulip.model';
import { IUserRoleTulip } from 'app/shared/model/user-role-tulip.model';

export interface IPatientTulip {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  createdBy?: string;
  createdDate?: Moment;
  patientVisits?: IVisitTulip[];
  patientAttachments?: IAttachmentTulip[];
  patient?: IUserRoleTulip;
}

export class PatientTulip implements IPatientTulip {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public gender?: string,
    public phone?: string,
    public address?: string,
    public city?: string,
    public pincode?: string,
    public createdBy?: string,
    public createdDate?: Moment,
    public patientVisits?: IVisitTulip[],
    public patientAttachments?: IAttachmentTulip[],
    public patient?: IUserRoleTulip
  ) {}
}
