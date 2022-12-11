import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAPI } from "../../../lib/api/base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body);
  const body = JSON.stringify({ data });
  await fetchAPI("analyses", {
    token: req.headers.authorization,
    options: { method: "POST", body },
  });
  res.json({ ok: true });
}
