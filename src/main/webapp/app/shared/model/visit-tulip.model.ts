import { Moment } from 'moment';
import { IVisitDetailsTulip } from 'app/shared/model/visit-details-tulip.model';
import { IAttachmentTulip } from 'app/shared/model/attachment-tulip.model';
import { IPatientTulip } from 'app/shared/model/patient-tulip.model';
import { ScheduleStatus } from 'app/shared/model/enumerations/schedule-status.model';

export interface IVisitTulip {
  id?: number;
  scheduleDate?: Moment;
  status?: ScheduleStatus;
  createdDate?: Moment;
  visits?: IVisitDetailsTulip[];
  visitAttachments?: IAttachmentTulip[];
  visit?: IPatientTulip;
}

export class VisitTulip implements IVisitTulip {
  constructor(
    public id?: number,
    public scheduleDate?: Moment,
    public status?: ScheduleStatus,
    public createdDate?: Moment,
    public visits?: IVisitDetailsTulip[],
    public visitAttachments?: IAttachmentTulip[],
    public visit?: IPatientTulip
  ) {}
}
