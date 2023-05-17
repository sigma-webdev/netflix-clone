const cloudinary = require("../config/cloudinaryConfig");

/**
 *  TODO: error handling of the input field
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns null
 */
const cloudinaryFileUpload = async (req, res, next) => {
  const files = req.files;

  //  cloudinary folder structure
  const folder1 = "trailers";
  const folder2 = "contents";

  //   template for content data
  let trailer = [
    {
      trailerUrl: "",
      trailerId: "",
    },
  ];

  //    template for content data
  let content = [
    {
      contentUrl: "",
      contentId: "",
    },
  ];

  //   file upload --
  try {
    if (Object.keys(files).includes("trailer")) {
      console.log("included");
      console.log(files.trailer.tempFilePath);
      const trailerTemp = await cloudinary.uploader.upload(
        files.trailer.tempFilePath,
        { folder: folder1 }
      );

      console.log("trailerTemp---", trailerTemp);
      req.body["trailer"] = {
        trailerUrl: trailerTemp.secure_url,
        trailerId: trailerTemp.public_id,
      };
    }
    if (Object.keys(files).includes("content")) {
      const contentTemp = await cloudinary.uploader.upload(
        files.content.tempFilePath,
        { folder: folder2 }
      );
      req.body["content"] = {
        contentUrl: contentTemp.secure_url,
        contentId: contentTemp.public_id,
      };
    }

    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = cloudinaryFileUpload;
