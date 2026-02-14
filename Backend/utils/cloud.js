import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Validate Cloudinary configuration
const validateCloudinaryConfig = () => {
  const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  
  if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.warn("Warning: Cloudinary configuration is incomplete. File uploads will fail.");
    return false;
  }
  return true;
};

// Configure Cloudinary
if (validateCloudinaryConfig()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;
