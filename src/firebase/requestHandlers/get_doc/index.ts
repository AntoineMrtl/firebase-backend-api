import express, { Request, Response } from "express";
import { getDatabase } from "../../database/database";
import { CHECK_READ_USER } from "../../../security/permissionHandler";
import { decodeId } from "../../helper/security";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const idToken = req.headers.authorization;

  const uid = await decodeId(idToken);

  if (!(await CHECK_READ_USER(req, res))) {
    res.status(401).send("Not Authorized");
    return;
  }

  if (uid) {
    const content = await getDatabase(req.query.path as string);

    res.status(200).send(content);
    return;
  }

  res.status(404).send("Invalid access token");
  return;
});

export default router;
