import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDERS = path.relative(TMP_FOLDER, "uploads");

const MAX_FILE_SIZE = 1024 * 1024 * 3;
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/jpg", "image/png"];

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const filehash = crypto.randomBytes(10).toString("hex");
      const filename = `${filehash} - {file.originalname} `;

      return callback(null, filename);
    },
  }),
};

export default {
  TMP_FOLDER,
  UPLOADS_FOLDERS,
  MULTER,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
};
