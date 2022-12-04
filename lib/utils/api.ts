import { ParsedStapiAttributes, StrapiAttributes } from "../models/api";

export const parseStrapiAttributes = ({
  createdAt,
  updatedAt,
}: StrapiAttributes): ParsedStapiAttributes => ({
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt),
});
