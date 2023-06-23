import express, { Request, Response } from "express";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "../../helper/client";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      clientAuth,
      body.email,
      body.password
    ).catch((error) => {
      console.error(error.code, error.message);
    });

    console.log(userCredential);

    if (!userCredential) throw new Error("User creation failed");

    const accessToken = await userCredential.user.getIdTokenResult();

    res.status(201).send({
      refreshToken: userCredential.user.refreshToken,
      accessToken: accessToken.token,
      expirationTime: accessToken.expirationTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
