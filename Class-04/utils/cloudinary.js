import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

//Cloudinary Configuration

/**
 * cloud name
 * api key
 * api secret
 */

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"
            }
        )
        console.log(`File is Uploaded on Cloudinary ${response.url}`)
        return response;
    } catch (error) {
        // Remove the locally saved temporary file as the upload operation got failed.
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }