import express, { Request, Response } from "express";
import { decodeId } from "../../helper/security";
import multer, { File } from "multer";
import { handlePushRequest } from "../../database/dataHandler";
import { pushDatabaseDocument } from "../../database/database";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  "/",
  upload.array("documents"),
  async (req: Request, res: Response) => {
    const idToken = req.headers.authorization;

    const uid = await decodeId(idToken);

    if (!uid) res.status(404).send("Invalid access token");

    await handlePushRequest(req);

    res.sendStatus(201);
  }
);

export default router;
