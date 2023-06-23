import { createUserWithEmailAndPassword } from "firebase/auth";
import express, { Request, Response } from "express";
import { clientAuth } from "../../helper/client";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      clientAuth,
      body.email,
      body.password
    ).catch((error) => {
      console.error(error.code, error.message);
    });

    if (!userCredential) throw new Error("User creation failed");

    const accessToken = await userCredential.user.getIdTokenResult();

    res.status(201).send({
      refresh_token: userCredential.user.refreshToken,
      access_token: accessToken.token,
      expirationTime: accessToken.expirationTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
