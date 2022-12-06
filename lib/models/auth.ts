import { ParsedStapiAttributes, StrapiAttributes } from "./api";

interface BaseUser {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
}

export type User = BaseUser & ParsedStapiAttributes;

export interface AuthResponse {
  user: BaseUser & StrapiAttributes;
  jwt: string;
}
