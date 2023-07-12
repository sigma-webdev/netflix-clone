const cloudinary = require("../config/cloudinary.config.js");
const CustomError = require("./customError.js");

const cloudinaryFileUpload = async (files, next) => {
  // cloudinary folder name
  const tailersFolder = "trailers";
  const contentsFolder = "contents";
  const thumbnailsFolder = "thumbnails";

  // template for content data, thumbnail to add urlId
  const filesDetails = {};

  // file upload
  try {
    // trailer
    if (files.trailer) {
      if (Object.keys(files).includes("trailer")) {
        const trailerTemp = await cloudinary.uploader.upload(
          files.trailer.tempFilePath,
          { resource_type: "video", folder: tailersFolder },
          (error) => {
            if (error) {
              return next(new CustomError(`File upload Error - ${error}`));
            }
          }
        );

        filesDetails["trailer"] = [
          {
            trailerUrl: trailerTemp.secure_url,
            trailerId: trailerTemp.public_id,
          },
        ];
      }
    }

    // content
    if (files.content) {
      if (Object.keys(files).includes("content")) {
        const contentTemp = await cloudinary.uploader.upload(
          files.content.tempFilePath,
          { resource_type: "video", folder: contentsFolder },
          (error) => {
            if (error) {
              return next(new CustomError(`File upload Error - ${error}`));
            }
          }
        );

        filesDetails["contentMovie"] = {
          movieUrl: contentTemp.secure_url,
          movieId: contentTemp.public_id,
        };
      }
    }

    // thumbnail
    if (files.thumbnail) {
      if (Object.keys(files).includes("thumbnail")) {
        const thumbnailTemp = await cloudinary.uploader.upload(
          files.thumbnail.tempFilePath,
          { folder: thumbnailsFolder },
          (error) => {
            if (error) {
              return next(CustomError(`Thumbnail fail to upload--- ${error}`));
            }
          }
        );

        filesDetails["thumbnail"] = [
          {
            thumbnailUrl: thumbnailTemp.secure_url,
            thumbnailId: thumbnailTemp.public_id,
          },
        ];
      }
    }

    return filesDetails;
  } catch (error) {
    if (error) {
      return next(new CustomError(`File upload Error - ${error}`));
    }
  }
};

module.exports = cloudinaryFileUpload;
