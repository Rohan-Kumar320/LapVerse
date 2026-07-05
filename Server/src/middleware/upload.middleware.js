import multer from "multer";
import AppError from "../utils/AppError.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError("Only JPG, JPEG and PNG images are allowed.", 400),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5, // Maximum 5 images
  },
  fileFilter,
});

export default upload;