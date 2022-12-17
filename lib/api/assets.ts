import { getSession } from "next-auth/react";
import { Asset } from "../models/asset";
import { fetchAPI } from "./base";

export const fetchAssets = async () => {
  const session = await getSession();
  const { data } = await fetchAPI<Asset[]>(`assets`, {
    token: session?.jwt,
    parameters: { populate: "*" },
  });
  return data;
};
