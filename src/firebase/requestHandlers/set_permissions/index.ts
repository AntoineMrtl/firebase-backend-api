import express, { Request, Response } from "express";
import { decodeId } from "../../helper/security";
import multer, { File } from "multer";
import { handleSetPrivilegeRequest } from "../../database/dataHandler";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  "/",
  upload.array("documents"),
  async (req: Request, res: Response) => {
    const idToken = req.headers.authorization;

    const uid = await decodeId(idToken);

    if (!uid) res.status(404).send("Invalid access token");

    await handleSetPrivilegeRequest(req);

    res.sendStatus(201);
  }
);

export default router;
