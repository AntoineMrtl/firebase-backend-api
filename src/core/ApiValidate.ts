import { Response } from "express";

const PermTypeModel = {
  sendMessages: true,
  sendPhotos: true,
  sendVideos: true,
  sendAudios: true,
  sendFiles: true,
  sendGifs: true,
  sendLinks: true,
  addMembers: true,
  PinMessages: true,
};

type PermType = typeof PermTypeModel;
const PermTypeKeys = Object.keys(PermTypeModel);

function validateRecord(
  record: Record<string, unknown>,
  model: Record<string, unknown>
): boolean {
  const recordKeys = Object.keys(record);
  if (
    recordKeys.length !== PermTypeKeys.length ||
    !recordKeys.every((key) => PermTypeKeys.includes(key))
  ) {
    return false;
  }

  return Object.entries(model).every(([key, type]) => {
    const value = record[key];
    return typeof value === typeof type;
  });
}

export const validatePermTypeRecord = function <
  T extends Record<string, unknown>
>(obj: T, res: Response): boolean {
  const result = validateRecord(obj, PermTypeModel);

  if (result) {
    return true;
  }

  // TO DO : make all error an api response more easy to handle

  // BAD REQUEST
  res.status(400).send("BAD REQUEST : WRONG PERM TYPE PARAMETER");
  return false;
};
