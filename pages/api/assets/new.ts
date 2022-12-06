import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAPI } from "../../../lib/api/base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.stringify({ data: req.body });
  await fetchAPI("assets", {
    token: req.headers.authorization,
    options: { method: "POST", body },
  });
  res.redirect("/assets");
}
