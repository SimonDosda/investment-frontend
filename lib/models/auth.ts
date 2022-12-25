export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ForgotPasswordInputs {
  email: string;
}

export interface ResetPasswordInputs {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegiserUserInputs {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegisterUserResponse {
  name: string;
  email: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface Token {
  token: string;
  refresh_token: string;
}

export interface LoginResponse extends Token {
  user: User;
}
