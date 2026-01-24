export type RegisterStateType = {
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
};

export type RegisterErrorStateType = {
  emailOrPhone?: string;
  password?: string;
  confirmPassword?: string;
  checkbox?: string;
  google?: string;
};

export type SubmitDataType = {
  email_or_phone: string;
  password: string;
  confirm_password: string;
};

export type SubmitDataErrorType = {
  email_or_phone?: string;
};
