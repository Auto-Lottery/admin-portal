export type AdminUser = {
  phoneNumber: string;
  operator: string;
  _id: string;
  roles: string[];
};

export type TokenData = {
  token: string;
  exp?: number;
};

export type User = {
  createdDate: string;
  phoneNumber: string;
  operator?: string;
  _id: string;
};

export type AdminUserWithToken = TokenData & AdminUser;
