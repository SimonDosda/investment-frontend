import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAPI } from "../../../lib/api";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.stringify({ data: req.body });
  await fetchAPI("assets", {}, { method: "POST", body });
  res.redirect("/assets");
}
