import express, { Request, Response } from "express";
import { adminAuth } from "../../helper/admin";
import { decodeId } from "../../helper/security";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const idToken = req.headers.authorization;

  const uid = await decodeId(idToken);

  try {
    if (!uid) throw new Error("Invalid access token");

    await adminAuth.revokeRefreshTokens(uid);
    res.status(200).send("Successfully logged out");
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
});

export default router;
