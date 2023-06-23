import { Request, Response } from "express";
import { ForbiddenResponse } from "../core/ApiResponse";
import { decodeId } from "../firebase/helper/security";

export async function CHECK_READ_USER(req: Request, res: Response) {
  const uid = await decodeId(req.headers.authorization);

  if (uid === req.params.path) return;
  return new ForbiddenResponse("READ USER UNALLOWED").send(res);
}
