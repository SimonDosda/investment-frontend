import { getSession } from "next-auth/react";
import { Asset, AssetInputs } from "../models/asset";
import { fetchAPI } from "./base";

export const getAssets = async (): Promise<Asset[]> => {
  const session = await getSession();
  const response = await fetchAPI<Asset[]>(`assets`, {
    token: session?.jwt,
    parameters: { populate: "*" },
  });
  return response.data;
};

export const addAsset = async (data: AssetInputs): Promise<Asset> => {
  const session = await getSession();
  const body = JSON.stringify({ data });
  const response = await fetchAPI<Asset>("assets", {
    token: session?.jwt,
    options: { method: "POST", body },
    parameters: { populate: "*" },
  });
  return response.data;
};
