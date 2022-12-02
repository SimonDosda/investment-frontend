import { StrapiData, StrapiResponse } from "./models/api";

export async function fetchAPI<T>(
  endpoint: string,
  options = {}
): Promise<StrapiResponse<T>> {
  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const url = `${
    process.env.STRAPI_URL || "http://localhost:1337"
  }/api/${endpoint}`;

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  return await response.json();
}
