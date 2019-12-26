import { Moment } from 'moment';
import { IPatientTulip } from 'app/shared/model/patient-tulip.model';

export interface IVisitTulip {
  id?: number;
  diagnosis?: string;
  prescription?: string;
  clinicalHistory?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  createdDate?: Moment;
  visit?: IPatientTulip;
}

export class VisitTulip implements IVisitTulip {
  constructor(
    public id?: number,
    public diagnosis?: string,
    public prescription?: string,
    public clinicalHistory?: string,
    public postalCode?: string,
    public city?: string,
    public state?: string,
    public createdDate?: Moment,
    public visit?: IPatientTulip
  ) {}
}
