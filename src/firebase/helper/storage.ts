import { storage } from "./admin";

import * as uuid from "uuid";

// Initialize Cloud Storage client
const bucket = storage.bucket();

// Function to store image in Cloud Storage
export async function uploadFile(
  imageBuffer: Buffer,
  filename: string,
  path: string
): Promise<string> {
  const newFilename = `${path}/${uuid.v4()}-${filename}`;
  const file = bucket.file(newFilename);

  await file.save(imageBuffer, { metadata: { contentType: "image/jpeg" } });
  return newFilename;
}
