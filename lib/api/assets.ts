import { getSession } from "next-auth/react";
import { Asset, AssetInputs } from "../models/asset";
import { fetchAPI } from "./base";

export const fetchAssets = async (): Promise<Asset[]> => {
  const session = await getSession();
  const { data } = await fetchAPI<Asset[]>(`assets`, {
    token: session?.jwt,
    parameters: { populate: "*" },
  });
  return data;
};

export const addAsset = async (data: AssetInputs) => {
  const session = await getSession();
  const body = JSON.stringify({ data });
  const result = await fetchAPI("assets", {
    token: session?.jwt,
    options: { method: "POST", body },
  });
  return result;
};
