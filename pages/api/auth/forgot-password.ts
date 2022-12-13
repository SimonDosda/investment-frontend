import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAPI } from "../../../lib/api/base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchAPI("auth/forgot-password", {
    options: { method: "POST", body: req.body },
  });
  res.json({ ok: true });
}
