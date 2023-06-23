import { pushDatabaseDocument, setJSONFirestore } from "./database";
import { Request } from "express";
import { decodeId } from "../helper/security";

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export const handlePushRequest = async function (req: Request) {
  // Format an array of all files in the request

  let files: File[];

  if ("files" in req) files = req.files as File[];
  else if ("file" in req) files = req.file as File[];
  else {
    console.error("No file found in the request");
    return;
  }

  // Get path from request

  const path = `${req.params.location_type as string}/${
    req.params.storage_id as string
  }`;

  if (!path) console.error("Invalid parameters in the request");

  // Push each file of files in cloud storage

  for (const file of files)
    await pushDatabaseDocument(path, file.originalname, file.size, file.buffer);
};

export const handleSetPrivilegeRequest = async function (req: Request) {
  if (!["Read", "Write"].includes(req.params.perm))
    console.error("Invalid parameters in the request");

  // TO-DO : verify req.params.perms, req.params.collection_id

  // TO-DO : correctly handle decodeId error return

  let path =
    req.params.collection_id === "self"
      ? await decodeId(req.params.authorization)
      : req.params.collection_id;

  path = `users/${path}/selfStorage`;

  await setJSONFirestore(path, "permissions", req.params.perms);
};
