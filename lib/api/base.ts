import QueryString from "qs";
import { StrapiParameters, StrapiResponse } from "../models/api";

export async function fetchAPI<T>(
  endpoint: string,
  {
    token = null,
    parameters = {},
    options = {},
  }: {
    token?: string | null;
    parameters?: StrapiParameters<T>;
    options?: RequestInit;
  }
): Promise<StrapiResponse<T>> {
  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };

  const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";
  const url = `${strapiUrl}/api/${endpoint}${getQuery(parameters)}`;

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    console.error(response);
    throw new Error(`An error occured please try again`);
  }
  return await response.json();
}

function getQuery<T>(parameters: StrapiParameters<T>): string {
  if (!Object.keys(parameters).length) {
    return "";
  }
  const query = QueryString.stringify({
    ...parameters,
    ...(parameters.sort
      ? { sort: `${String(parameters.sort.key)}:${parameters.sort.order}` }
      : {}),
  });
  return `?${query}`;
}
