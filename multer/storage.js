import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import mongoose from "mongoose";
import path from "path";
import crypto from "crypto";

var storage = new GridFsStorage({
  url: `${process.env.MONGO_DB}`,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = { filename: filename, bucketName: "files" };
        resolve(fileInfo);
      });
    });
  },
});
export const upload = multer({ storage });
