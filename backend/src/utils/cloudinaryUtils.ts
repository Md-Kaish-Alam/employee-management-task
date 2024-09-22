import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Utility function to upload image to Cloudinary
export const uploadToCloudinary = async (filePath: string, folder: string) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder, // The folder in Cloudinary where the image will be stored
    });
    return result.secure_url; // Return the Cloudinary URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image.");
  }
};