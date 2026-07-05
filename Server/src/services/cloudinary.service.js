import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


//Upload Images While Creating Products
export const uploadToCloudinary = (fileBuffer, folder = "lapverse") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};


//Update Images 
export const uploadMultipleImages = async (files) => {
  const uploadedImages = [];

  for (const file of files) {
    const image = await uploadToCloudinary(file.buffer);

    uploadedImages.push({
      url: image.url,
      public_id: image.public_id,
    });
  }

  return uploadedImages;
};