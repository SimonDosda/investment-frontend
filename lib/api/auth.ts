import { AuthResponse } from "../models/auth";
import { fetchAPI } from "./base";

export async function signIn(credentials: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> {
  return (await fetchAPI("auth/local", {
    options: {
      method: "POST",
      body: JSON.stringify(credentials),
    },
  })) as unknown as AuthResponse;
}

export async function register(credentials: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return (await fetchAPI("auth/local/register", {
    options: {
      method: "POST",
      body: JSON.stringify(credentials),
    },
  })) as unknown as AuthResponse;
}
