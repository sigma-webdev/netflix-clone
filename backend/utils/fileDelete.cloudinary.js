const cloudinary = require("../config/cloudinaryConfig");
const CustomError = require("./customerror");

const cloudinaryImageDelete = (publicId) => {
  try {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        // TODO: throw the error
        console.log("ERROR in DELETING Image - ", error);
        // throw new CustomError("  ")
      } else {
        // TODO: send the success result
        console.log("RESULT in DELETING Image - ", result);
      }
    });
  } catch (error) {
    // TODO: throw the error
    console.log("ERROR IN DELETING IMAGE - ", error);
  }
};

// video file delete ---
const cloudinaryFileDelete = (publicId) => {
  try {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: "video" },

      (error, result) => {
        if (error) {
          // TODO: throw the error
          console.log("ERROR in DELETING FILE - ", error);
        } else {
          // TODO: send the success result
          console.log("RESULT OF DELETING FILE - ", result);
        }
      }
    );
  } catch (error) {
    // TODO: throw the error
    console.log("DELETING FILE ERROR - ", error);
  }
};

module.exports = { cloudinaryFileDelete, cloudinaryImageDelete };
