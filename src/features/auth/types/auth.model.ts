export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: Date;
  roleId?: number;
  role?: IRole;
}

export interface IRole {
  id: number;
  name: string;
  permissions: IPermission[];
  status: string;
}

export interface IPermission {
  id: number;
  name: string;
  status: string;
}
