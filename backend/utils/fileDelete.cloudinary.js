const cloudinary = require("../config/cloudinaryConfig");
const CustomError = require("./customError");

const cloudinaryImageDelete = async (publicId, next) => {
  try {
    await cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        return next(
          new CustomError(`File not able to update/delete ${error} `, 500)
        );
        // throw new CustomError("  ")
      } else {
        // TODO: send the success result
        console.log("RESULT in DELETING Image - ", result);
      }
    });
  } catch (error) {
    return next(new CustomError(`Error in  the image - ${error}`, 400));
  }
};

// video file delete ---
const cloudinaryFileDelete = async (publicId, next) => {
  try {
    await cloudinary.uploader.destroy(
      publicId,
      { resource_type: "video" },

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

module.exports = { cloudinaryFileDelete, cloudinaryImageDelete };
