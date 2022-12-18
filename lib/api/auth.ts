import { AuthResponse, RegiserUserInputs } from "../models/auth";
import { fetchAPI } from "./base";

export async function signIn(credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return (await fetchAPI("users/login", {
    options: {
      method: "POST",
      body: JSON.stringify(credentials),
    },
  })) as unknown as AuthResponse;
}

export async function registerUser(
  inputs: RegiserUserInputs
): Promise<AuthResponse> {
  return (await fetchAPI("users", {
    options: {
      method: "POST",
      body: JSON.stringify(inputs),
    },
  })) as unknown as AuthResponse;
}
