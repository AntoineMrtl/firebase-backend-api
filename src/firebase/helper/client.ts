import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

export const clientAuth = getAuth(app);

export const db = getFirestore(app);
