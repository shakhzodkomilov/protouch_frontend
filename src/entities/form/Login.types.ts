export type LoginStateType = {
  emailOrPhone: string;
  password: string;
};

export type LoginErrorStateType = {
  emailOrPhone?: string;
  password?: string;
  google?: string;
};

export type SubmitDataType = {
  email_or_phone: string;
  password: string;
};

export type SubmitDataErrorType = {
  detail: string;
};
