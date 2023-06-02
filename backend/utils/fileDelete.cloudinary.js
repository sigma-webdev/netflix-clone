const cloudinary = require("../config/cloudinaryConfig");
const cloudinaryFileDelete = (publicId) => {
  try {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: "video" },
      (error, result) => {
        if (error) {
          console.log("ERROR in DELETE - ", error);
        } else {
          console.log("RESULT OF DELETE - ", result);
        }
      }
    );
  } catch (error) {
    console.log("Delete Error - ", error);
  }
};

module.exports = cloudinaryFileDelete;
