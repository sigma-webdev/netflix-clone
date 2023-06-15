const cloudinary = require("../config/cloudinaryConfig");
const CustomError = require("./customError");

const cloudinaryFileUpload = async (files) => {
  //  cloudinary folder name
  const folder1 = "trailers";
  const folder2 = "contents";
  const folder3 = "thumbnails";

  // let trailer = [
  //   {
  //     trailerUrl: "",
  //     trailerId: "",
  //   },
  // ];

  // //    template for content data
  // let content = [
  //   {
  //     contentURL: "",
  //     contentID: "",
  //   },
  // ];

  // let thumbnail = [
  //   {
  //     thumbnailUrl: "",
  //     thumbnailID: "",
  //   },
  // ];

  //   template for content data, thumbnail to add urlId
  const filesDetails = {};
  console.log("fileDetails ", filesDetails);

  // console.log("files.trailer ----------- ", files.trailer);
  // console.log("files.trailer ----------- ", files.content);
  // console.log("files.trailer ----------- ", files.content);

  //   file upload --
  try {
    // trailer ---
    console.log(files);
    if (files && files.trailer) {
      if (Object.keys(files).includes("trailer")) {
        const trailerTemp = await cloudinary.uploader.upload(
          files.trailer.tempFilePath,
          { resource_type: "video", folder: folder1 },
          (error, result) => {
            if (error) console.log(error);
            if (result) console.log(result);
          }
        );
        // console.log("trailerTemp---", trailerTemp);
        filesDetails["trailer"] = [
          {
            trailerUrl: trailerTemp.secure_url,
            trailerId: trailerTemp.public_id,
          },
        ];
      }
    }

    // content
    if (files && files.content) {
      if (Object.keys(files).includes("content")) {
        const contentTemp = await cloudinary.uploader.upload(
          files.content.tempFilePath,
          { resource_type: "video", folder: folder2 },
          (error, result) => {
            if (error) console.log(error);
            if (result) console.log(result);
          }
        );
        filesDetails["content"][0].contentURL = contentTemp.secure_url;
        filesDetails["content"][0].contentID = contentTemp.public_id;
      }
    }

    // thumbnail
    if (files && files.thumbnail) {
      if (Object.keys(files).includes("thumbnail")) {
        const thumbnailTemp = await cloudinary.uploader.upload(
          files.thumbnail.tempFilePath,
          { folder: folder3 },
          (error, result) => {
            if (error) console.log(error);
            if (result) console.log(result);
          }
        );

        filesDetails["thumbnail"][0].thumbnailUrl = thumbnailTemp.secure_url;
        filesDetails["thumbnail"][0].thumbnailID = thumbnailTemp.public_id;
      }
    }
    console.log(filesDetails);
    //
    return filesDetails;
  } catch (error) {
    console.log("Error - ", error);
  }
};

module.exports = cloudinaryFileUpload;
