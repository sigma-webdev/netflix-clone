const cloudinary = require("../config/cloudinaryConfig");
const CustomError = require("./customError");

const cloudinaryFileUpload = async (files) => {
  if (!files.trailer) {
    return new CustomError("Please add trailer file", 400);
  }

  if (!files.content) {
    return new CustomError("Please add content file", 400);
  }

  if (!files.thumbnail) {
    return new CustomError("Please add thumbnail file", 400);
  }

  //  cloudinary folder name
  const folder1 = "trailers";
  const folder2 = "contents";
  const folder3 = "thumbnails";

  let trailer = [
    {
      trailerUrl: "",
      trailerId: "",
    },
  ];

  //    template for content data
  let content = [
    {
      contentURL: "",
      contentID: "",
    },
  ];

  let thumbnail = [
    {
      trailerUrl: "",
      trailerID: "",
    },
  ];

  //   template for content data, thumbnail to add urlId
  const filesDetails = { trailer, content, thumbnail };
  console.log("fileDetails ", filesDetails);

  //   file upload --
  try {
    // trailer ---
    if (Object.keys(files).includes("trailer")) {
      const trailerTemp = await cloudinary.uploader.upload(
        files.trailer.tempFilePath,
        { resource_type: "video", folder: folder1 }
      );
      // console.log("trailerTemp---", trailerTemp);
      filesDetails["trailer"][0].trailerUrl = trailerTemp.secure_url;
      filesDetails["trailer"][0].trailerId = trailerTemp.public_id;
    }

    // content
    if (Object.keys(files).includes("content")) {
      const contentTemp = await cloudinary.uploader.upload(
        files.content.tempFilePath,
        { resource_type: "video", folder: folder2 }
      );
      filesDetails["content"][0].contentURL = contentTemp.secure_url;
      filesDetails["content"][0].contentID = contentTemp.public_id;
    }

    // thumbnail
    if (Object.keys(files).includes("thumbnail")) {
      const thumbnailTemp = await cloudinary.uploader.upload(
        files.thumbnail.tempFilePath,
        { folder: folder3 }
      );

      filesDetails["thumbnail"][0].thumbnailUrl = thumbnailTemp.secure_url;
      filesDetails["thumbnail"][0].thumbnailID = thumbnailTemp.public_id;
    }

    //
    return filesDetails;
  } catch (error) {
    console.log("Error - ", error);
  }
};

module.exports = cloudinaryFileUpload;
