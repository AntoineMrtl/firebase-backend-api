import admin from "firebase-admin";
import {
  adminFireBaseCredentialPath,
  databaseURL,
  bucketURL,
} from "../../config";
import { readFileSync } from "fs";
import { resolve } from "path";

const serviceAccount = JSON.parse(
  readFileSync(resolve(adminFireBaseCredentialPath)).toString()
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
  storageBucket: bucketURL,
});

export const adminAuth = admin.auth();

export const db = admin.firestore();

export const storage = admin.storage();
