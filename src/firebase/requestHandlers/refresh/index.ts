import express, { Request, Response } from "express";
import { adminAuth } from "../../helper/admin";
import { clientAuth } from "../../helper/client";
import { signInWithCustomToken } from "firebase/auth";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const refreshToken = req.headers.refresh_token;
  const uid = req.headers.uid;

  try {
    if (
      !uid ||
      uid instanceof Array ||
      !refreshToken ||
      refreshToken instanceof Array
    ) {
      throw new Error("Token refreshing failed");
    }

    const customToken = await adminAuth.createCustomToken(uid);

    const userCredential = await signInWithCustomToken(clientAuth, customToken);

    if (!userCredential) throw new Error("User creation failed");

    const accessToken = await userCredential.user.getIdTokenResult();

    res.status(201).send({
      access_token: accessToken.token,
      expirationTime: accessToken.expirationTime,
    });
  } catch (error) {
    console.error("Token refreshing failed");
    res.sendStatus(500);
  }
});

export default router;
