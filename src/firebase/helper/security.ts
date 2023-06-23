import { adminAuth } from "./admin";

export const decodeId = async function (idToken: string | undefined) {
  try {
    if (idToken) {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      return decodedToken.uid;
    }
    // handle undefined
  } catch (error) {
    console.error(error);
  }

  return false;
};
