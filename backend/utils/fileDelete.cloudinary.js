const cloudinary = require("../config/cloudinaryConfig");
const CustomError = require("./customError");

// Cloudinary delete
const cloudinaryFileDelete = async (publicId, next, fileType = "video") => {
  try {
    await cloudinary.uploader.destroy(
      publicId,
      { resource_type: fileType === "image" ? "image" : "video" },
      (error, result) => {
        if (error) {
          return next(
            new CustomError(
              `Error in updating/deleting  the File ${error}`,
              400
            )
          );
        } else {
          // TODO: send the success result
          console.log("RESULT OF DELETING FILE - ", result);
        }
      }
    );
  } catch (error) {
    return next(new CustomError("Error in Deleting the Content File"));
  }
};

module.exports = { cloudinaryFileDelete };
