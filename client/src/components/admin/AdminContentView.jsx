import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getContentDetailsById, deleteContentById, updateContentById } from '../../ApiUtils';
import { BsCloudUpload } from "react-icons/bs";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContentById,
  deleteContentById,
  updateContentById,
} from "../../store/contentSlice";

const AdminContentView = () => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.content.currentContent);
  const isLoading = useSelector((state) => state.content.loading);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [castArr, setCastArr] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editedContentData, setEditedContentData] = useState({});
  const params = useParams();
  console.log(params.id);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchContentById(params.id));
    setEditedContentData(contentData);
  }, []);

  const handleDelete = () => {
    console.log("delete this");
    // redirect('/admin/managecontents/')
    dispatch(deleteContentById(contentData._id));
    navigate("/admin/managecontents");
    //   redirect('/admin/managecontents')
  };
  const handleArrayChange = () => {
    setCastArr([...castArr, editedContentData.cast]);
    setEditedContentData({
      ...editedContentData,
      cast: "",
    });
  };
  const handleRemoveCast = (castname) => {
    let newCast = castArr.filter((item) => item !== castname);
    setCastArr(newCast);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      console.log(
        "please wait till the first submisson got fullfiled or rejected"
      );
      return;
    }
    // setIsLoading(true)
    const {
      name,
      description,
      categories,
      genres,
      creator,
      rating,
      language,
      trailer,
      content,
      cast,
      thumbnail,
      episodes,
    } = editedContentData;
    const sentFormData = new FormData();
    if (name && name !== contentData.name) {
      sentFormData.append("name", name);
    }
    if (description && description !== contentData.description) {
      sentFormData.append("description", description);
    }
    if (categories && categories !== contentData.categories) {
      sentFormData.append("categories", categories);
    }
    if (genres && genres !== contentData.genres) {
      sentFormData.append("genres", genres);
    }
    if (creator && creator !== contentData.creator) {
      sentFormData.append("creator", creator);
    }
    if (rating && rating !== contentData.rating) {
      sentFormData.append("rating", rating);
    }
    if (language && language !== contentData.language) {
      sentFormData.append("language", language);
    }
    if (trailer && trailer !== contentData.trailer) {
      sentFormData.append("trailer", trailer);
    }
    if (content && content !== contentData.content) {
      sentFormData.append("content", content);
    }
    // if (cast && cast !== castArr) {
    //   sentFormData.append("cast", castArr);
    // }
    if (thumbnail && thumbnail !== contentData.thumbnail) {
      sentFormData.append("thumbnail", thumbnail);
    }
    if (episodes && episodes !== contentData.episodes) {
      sentFormData.append("episodes", episodes);
    }

    dispatch(updateContentById(params.id, { ...sentFormData, castArr }));
  };

  const toggleModal = (val) => {
    setIsOpen(val);
  };
  // const handleChange =(e)=>{
  //   const { name, value } = e.target;
  //   setEditedContentData(prev=>{
  //     return {...prev, [name]: value }
  //   })
  // }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setEditedContentData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (event, name) => {
    console.log(event.target.files[0], "//////fsd");
    console.log(name, "////name");
    setIsUploading(true);
    const file = event.target.files[0];
    if (!isUploading) {
      const sentFormData = new FormData();
      sentFormData.append(name, file);
      dispatch(updateContentById({ id: params.id, sentFormData }));
      setIsUploading(false);
      // dispatch(fetchContentById(params._id))
    }

    // console.log(file)
    // setEditedContentData(prevDetails => ({
    //   ...prevDetails,
    //   [event.target.name]: file
    // }));
  };

  const uploadContent = () => {
    fileInputRef.current.click();
  };

  const handleSelectedFile = (event) => {
    console.log("handle select callled");
    const file = event.target.files[0];
    console.log(file);
    // const sentFormData = new FormData();
    const sentFormData = new FormData();
    sentFormData.append("thumbnail", file);
    console.log(sentFormData, "////");
    // updateContentById(params.id, formData, (progress) => {
    //   setUploadProgress(progress)
    // });

    dispatch(updateContentById({ id: params.id, sentFormData }));
  };

  return (
    <>
      {isOpen && (
        <div className="absolute z-50 flex h-full w-full items-center justify-center border bg-cyan-600 bg-opacity-60">
          <div className="no-scrollbar relative  max-h-[80%]  w-96 overflow-y-scroll rounded-lg bg-gray-50 px-4 py-12">
            <div
              onClick={() => toggleModal(false)}
              className="absolute right-3 top-2 cursor-pointer text-3xl"
            >
              X
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label htmlFor="name">Movie Name:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="name"
                value={editedContentData.name}
                onChange={handleInputChange}
              />
              <label htmlFor="genres">Genres:</label>
              <select
                className="rounded border bg-transparent p-2"
                name="genres"
                value={editedContentData.genres}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Action">Action</option>
                <option value="Anime">Anime</option>
                <option value="Children & Family">Children & Family</option>
                <option value="Classic">Classic</option>
                <option value="Comedies">Comedies</option>
                <option value="Documentaries">Documentaries</option>
                <option value="Horror">Horror</option>
                <option value="Dramas">Dramas</option>
                <option value="Romantic">Romantic</option>
                <option value="Sci-fi & Fantasy">Sci-fi & Fantasy</option>
                <option value="Sports">Sports</option>
                <option value="Thrillers">Thrillers</option>
              </select>

              <label htmlFor="text">Description:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="description"
                value={editedContentData.description}
                onChange={handleInputChange}
              />
              <label htmlFor="cast">Cast:</label>
              <div>
                <input
                  className="mr-4 w-[88%] rounded border bg-transparent p-2"
                  type="text"
                  name="cast"
                  value={editedContentData.cast}
                  onChange={handleInputChange}
                />
                <div
                  onClick={handleArrayChange}
                  className="inline-block cursor-pointer rounded bg-[#E50914] px-4 py-2 text-white hover:bg-[#d4252e]"
                >
                  Add
                </div>
              </div>
              {castArr.length > 0 && (
                <div className="flex flex-wrap">
                  {castArr.map((castname) => (
                    <div className="relative m-2  rounded  bg-blue-200">
                      <div
                        onClick={() => handleRemoveCast(castname)}
                        className="absolute -top-1 right-1 cursor-pointer"
                      >
                        x
                      </div>
                      <p className=" w-fit px-3 py-2">{castname}</p>
                    </div>
                  ))}
                </div>
              )}

              <label htmlFor="categories"> Categories:</label>

              <div className="ml-4  flex items-center">
                <label className="">Movies</label>
                <input
                  className="ml-1 mr-4 mt-1"
                  type="radio"
                  name="categories"
                  required
                  onChange={handleInputChange}
                  value="Movies"
                  checked={editedContentData.categories === "Movies"}
                />
                <label className="">Series</label>
                <input
                  className="ml-1 mt-1"
                  type="radio"
                  name="categories"
                  required
                  onChange={handleInputChange}
                  value="Series"
                  checked={editedContentData.categories === "Series"}
                />
              </div>

              <label htmlFor="creator"> Director:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="director"
                value={editedContentData.director}
                onChange={handleInputChange}
              />
              <label htmlFor="rating"> Rating:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="rating"
                value={editedContentData.rating}
                onChange={handleInputChange}
              />
              <label htmlFor="language"> Language:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="language"
                value={editedContentData.language}
                onChange={handleInputChange}
              />
              <label htmlFor="releaseDate"> Release Date:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="date"
                required
                name="releaseDate"
                value={editedContentData.releaseDate}
                onChange={handleInputChange}
              />
              <label htmlFor="releaseDate"> Origin Country</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="originCountry"
                value={editedContentData.originCountry}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-4 rounded bg-[#E50914] py-2 text-white hover:bg-[#d4252e]"
              >
                Add Content{" "}
                {isLoading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </form>
            {/* <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
              <label htmlFor="name">Movie Name:</label>
              <input className='bg-transparent border p-2 rounded' type="text" required name="name" value={editedContentData.name} onChange={handleInputChange} />
              <label htmlFor="genres">Genres:</label>
              <input className='bg-transparent border p-2 rounded' type="text" required name="genres" value={editedContentData.genres} onChange={handleInputChange} />
              <label htmlFor="text">Description:</label>
              <input className='bg-transparent border p-2 rounded' type="text" required name="description" value={editedContentData.description} onChange={handleInputChange} />
              <label htmlFor="cast">Cast:</label>
              <input className='bg-transparent border p-2 rounded' type="text" required name="cast" value={editedContentData.cast} onChange={handleInputChange} />
              <label htmlFor="categories">  Categories:</label>
              <label className=''>
                Movies
                <input className='' type="radio" name="categories" required onChange={handleInputChange} value="Movies" checked={editedContentData.categories === 'Movies'} />

              </label>
              <label>
                TV shows
                <input className='' type="radio" name="categories" required onChange={handleInputChange} value="Series" checked={editedContentData.categories === 'Series'} />

              </label>

              <label htmlFor="creator">  Director:</label>
              <input className='bg-transparent border p-2 rounded' type="text" name="director" value={editedContentData.director} onChange={handleInputChange} />
              <label htmlFor="rating">  Rating:</label>
              <input className='bg-transparent border p-2 rounded' type="text" name="rating" value={editedContentData.rating} onChange={handleInputChange} />
              <label htmlFor="language">  Language:</label>
              <input className='bg-transparent border p-2 rounded' type="text" name="language" value={editedContentData.language} onChange={handleInputChange} />


              <button type='submit' disabled={isLoading} className='bg-green-600 hover:bg-greean-700 text-white rounded py-2 flex items-center gap-4 justify-center'>Add Content {isLoading && <div role="status">
                <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>} 
              </button>

            </form> */}
          </div>
        </div>
      )}
      <div className="flex max-h-[100vh] w-10/12 flex-col items-center gap-5 overflow-y-scroll bg-slate-800 py-4">
        <h2 className="text-white">Content</h2>

        {/* <table className='text-white'>
      <tbody>
        {Object.entries(contentData).map(([key, value]) => {
          if (key === 'thumbnail' || key === 'content' || key === 'trailer' || key === '_id' || key === 'likes' || key === 'episodes' || key === 'createdAt' || key === '__v' || key === 'updatedAt') {
            return null; // Skip rendering this row
          }
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table> */}
        {isLoading ? (
          <h2 className="text-white">Loading..</h2>
        ) : Object.keys(contentData).length !== 0 ? (
          <>
            <div className="flex w-full gap-4 px-4">
              {/* <button onClick={() => toggleModal(true)} className='px-3 py-1 bg-green-500 cursor-pointer rounded text-white'>Edit</button> */}
              <button
                onClick={handleDelete}
                className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white"
              >
                Delete
              </button>
            </div>
            <div className="w-full px-4 text-white ">
              {/* <CircularProgressbar value={uploadProgress} text={`${uploadProgress}%`} />; */}
              <form>
                <div
                  onClick={uploadContent}
                  title="upload thumbnial"
                  className="group relative cursor-pointer"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSelectedFile}
                  />
                  <BsCloudUpload className="absolute left-[50%] top-[50%] z-10 -translate-x-[50%] -translate-y-[50%] text-8xl opacity-0 transition group-hover:opacity-100" />
                  <img
                    className="h-[450px] w-full transition hover:bg-black group-hover:opacity-40"
                    src={contentData.thumbnail[0].thumbnailUrl}
                    alt=""
                  />
                </div>
                <div
                  onClick={() => toggleModal(true)}
                  className="my-8 w-fit cursor-pointer rounded bg-green-500 px-3 py-1 text-white"
                >
                  Edit details
                </div>

                <div className="flex gap-2">
                  <h3 className="text-gray-300">{contentData.rating}</h3>
                  <h3>/</h3>
                  <h3 className="">{contentData.language}</h3>
                  <h3>/</h3>
                  <h3 className="">{contentData.genres}</h3>
                  <h3>/</h3>
                  <h3 className="">{contentData.categories}</h3>
                </div>
                <div>
                  <div className="my-4 flex gap-4">
                    <h4 className="w-32 text-gray-400">Movie Name:</h4>
                    <h2 className="">{contentData.name}</h2>
                  </div>
                  <div className="my-4 flex gap-4">
                    <h4 className="w-32 text-gray-400">Description:</h4>
                    <h3 className="">{contentData.description}</h3>
                  </div>
                  <div className="my-4 flex gap-4">
                    <h4 className="w-32 text-gray-400">Cast:</h4>
                    <div>
                      {contentData.cast.map((item) => (
                        <h3 className="text-white">{item}</h3>
                      ))}
                    </div>
                  </div>
                  {/* <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Language:</h4>
              <h3 className=''>{contentData.language}</h3>
              
              
            </div> */}
                </div>
                <div>
                  <div className="my-4 flex gap-4">
                    <h4 className="w-32 text-gray-400">Director:</h4>
                    <h3 className="text-white">{contentData.director}</h3>
                  </div>
                  <div className="my-4 flex gap-4">
                    <h4 className="w-32 text-gray-400">Trailer:</h4>
                    <video
                      width="520"
                      height="440"
                      src={contentData.trailer[0].trailerUrl}
                      controls
                    ></video>
                    <div>
                      <input
                        type="file"
                        disabled={isLoading}
                        onChange={(e) => handleFileChange(e, "trailer")}
                        className="h-fit cursor-pointer rounded bg-[#E50914] px-3 py-1 hover:bg-[#d4252e]"
                      />
                    </div>
                  </div>
                  <div className="my-4 flex gap-4">
                    <h4 className="w-32 text-gray-400">Content:</h4>
                    <video
                      width="520"
                      height="440"
                      src={contentData.content[0].contentURL}
                      controls
                    ></video>
                    <div>
                      <input
                        type="file"
                        disabled={isLoading}
                        onChange={(e) => handleFileChange(e, "content")}
                        className="h-fit cursor-pointer rounded bg-[#E50914] px-3 py-1 hover:bg-[#d4252e]"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Genres:</h4>
              <h3 className=''>{contentData.genres}</h3>
            </div> */}
                {/* <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Categories:</h4>
              <h3 className=''>{contentData.categories}</h3>
            </div> */}
              </form>
            </div>
          </>
        ) : (
          <h2 className="text-white">Loading..</h2>
        )}
      </div>
    </>
  );
};

export default AdminContentView;
