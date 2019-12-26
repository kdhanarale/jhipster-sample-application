import { Moment } from 'moment';
import { IPatientTulip } from 'app/shared/model/patient-tulip.model';
import { UserType } from 'app/shared/model/enumerations/user-type.model';

export interface IUserRoleTulip {
  id?: number;
  type?: UserType;
  firstName?: string;
  lastName?: string;
  createdBy?: string;
  createdDate?: Moment;
  users?: IPatientTulip[];
}

export class UserRoleTulip implements IUserRoleTulip {
  constructor(
    public id?: number,
    public type?: UserType,
    public firstName?: string,
    public lastName?: string,
    public createdBy?: string,
    public createdDate?: Moment,
    public users?: IPatientTulip[]
  ) {}
}
