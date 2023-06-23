import { db } from "../helper/admin";
import { uploadFile } from "../helper/storage";
import { bucketURL } from "../../config";

// lowest level databases calls | used by database handler

// Store document in cloud storage
export const pushDatabaseDocument = async function (
  path: string,
  filename: string,
  fileSize: number,
  fileBuffer: Buffer
) {
  try {
    // Upload file to Cloud Storage
    const imageRef = await uploadFile(fileBuffer, filename, path);

    // METADATA IN FIRESTORE

    /*
    // Instantiate metadatas
    const document = {
      location: `gs://${bucketURL}/${imageRef}`,
      size: fileSize,
    };

    // Store metadatas in Firestore
    await db
      .collection("users" + path)
      .doc(imageRef)
      .set(document);
    */

    console.log(`Document successfully written in path ${path}`);
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

// Merge JSON "document" to a specific document path in a collection
export const addJSONFirestore = async function (
  docPath: string,
  docRef: string,
  document: {}
) {
  await db
    .collection(docPath)
    .doc(docRef)
    .set(document, { merge: true })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  console.log("Document successfully written in " + docPath);
};

// Set JSON "document" to a specific document path in a collection
export const setJSONFirestore = async function (
  docPath: string,
  docRef: string,
  document: {}
) {
  await db
    .collection(docPath)
    .doc(docRef)
    .set(document)
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  console.log("Document successfully written in " + docPath);
};

export const getDatabase = async function (targetPath: string) {
  return await db
    .collection("docs")
    .doc(targetPath)
    .get()
    .catch((error) => {
      console.error("Error fetching document: ", error);
    });
};
