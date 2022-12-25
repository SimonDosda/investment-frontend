import {
  ForgotPasswordInputs,
  LoginInputs,
  LoginResponse,
  RegiserUserInputs,
  RegisterUserResponse,
  ResetPasswordInputs,
} from "../models/auth";
import { fetchAPI, postApi } from "./base";

export async function signIn(inputs: LoginInputs): Promise<LoginResponse> {
  return await postApi("users/login", inputs);
}

export async function registerUser(
  inputs: RegiserUserInputs
): Promise<RegisterUserResponse> {
  return await postApi("users", inputs);
}

export async function sendResetPasswordLink(
  inputs: ForgotPasswordInputs
): Promise<boolean> {
  return await postApi("auth/forgot-password", inputs);
}

export async function resetPassword(
  inputs: ResetPasswordInputs
): Promise<boolean> {
  return await postApi("auth/reset-password", inputs);
}
