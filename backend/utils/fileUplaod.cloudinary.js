const cloudinary = require("../config/cloudinaryConfig");
const CustomError = require("./customerror");

const cloudinaryFileUpload = async (req, res, next) => {
  const files = req.files;

  if (!files.trailer) {
    return next(new CustomError("Please add trailer file", 400));
  }

  if (!files.content) {
    return next(new CustomError("Please add content file", 400));
  }

  //  cloudinary folder name
  const folder1 = "trailers";
  const folder2 = "contents";
  const folder3 = "thumbnails";

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
    // trailer ---
    if (Object.keys(files).includes("trailer")) {
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
    // content
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

    // thumbnail
    if (Object.keys(files).includes("thumbnail")) {
      const thumbnailTemp = await cloudinary.uploader.upload(
        files.thumbnail.tempFilePath,
        { folder: folder3 }
      );
      req.body["thumbnail"] = thumbnailTemp.secure_url;
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = cloudinaryFileUpload;
