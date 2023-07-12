import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsCloudUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContentById,
  deleteContentById,
  updateContentThumbnailById,
  updateContentDetailsById,
  updateContentVideoById,
  updateContentTrailerById
} from "../../store/adminManageContentSlice";
import toast from "react-hot-toast";

const AdminContentView = () => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.admin.currentContent);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isThumbnailUploading = useSelector((state) => state.admin.isThumbnailUploading)
  const isDetailsUploading = useSelector((state) => state.admin.isDetailsUploading)
  const isTrailerUploading = useSelector((state) => state.admin.isTrailerUploading)
  const isContentUploading = useSelector((state) => state.admin.isContentUploading)
  const [castInput, setCastInput] = useState('')
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editedContentData, setEditedContentData] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchContentById({ contentId: params.contentId }));
  }, []);


  useEffect(() => {
    setEditedContentData(contentData);
  }, [contentData]);


  const handleDelete = () => {

    dispatch(deleteContentById(params.contentId));
    navigate("/admin/managecontents");
    //   redirect('/admin/managecontents')
  };


  const handleRemoveCast = (castname) => {
    const indexOfCastToBeRemoved = editedContentData.cast.indexOf(castname)
    const newCast = editedContentData.cast.filter((item, index) => index !== indexOfCastToBeRemoved);
    setEditedContentData({ ...editedContentData, cast: newCast })
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      toast.error("wait until the current ongoing process end");
      return;
    }
    if (editedContentData.contentType === "Series") {
      toast.error("series feature will be coming soon, please add only content type movie");
      return;
    }

    if (editedContentData.cast.length === 0) {
      toast.error("cast cannot be empty field❗");
      return;
    }

    dispatch(updateContentDetailsById({ id: params.contentId, newData: editedContentData }))
    toggleModal(false)
  };

  const toggleModal = (val) => {
    setIsOpen(val);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "cast") {
      setCastInput(value)
    } else {
      setEditedContentData({ ...editedContentData, [name]: value })
    }
  };

  const handleAddCast = () => {
    if(castInput === "" || castInput.length < 2){
      toast.error("please enter a valid input");
      return
    }
    const newCastArr = [...editedContentData.cast, castInput]
    setEditedContentData({ ...editedContentData, cast: newCastArr })
    setCastInput('')

  }

  const uploadContent = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event, name) => {
    if (isThumbnailUploading || isContentUploading || isTrailerUploading || isDetailsUploading) {
      toast.error("wait until the current uploading data process end");
      return;
    }
    const file = event.target.files[0];
    const sentFormData = new FormData();
    sentFormData.append(name, file);


    if (name === "thumbnail") {
      dispatch(updateContentThumbnailById({ id: params.contentId, newData: sentFormData }))
    }
    if (name === "content") {
      dispatch(updateContentVideoById({ id: params.contentId, newData: sentFormData }))
    }
    if (name === "trailer") {
      dispatch(updateContentTrailerById({ id: params.contentId, newData: sentFormData }))
    }

  };


  return (
    <>
      {isOpen && (
        <div className="absolute z-50 flex h-full w-full items-center justify-center border bg-cyan-100 bg-opacity-60">
          <div className="no-scrollbar relative  max-h-[80%] w-[700px] overflow-y-scroll rounded-lg bg-gray-50 px-4 py-12">
            <div
              onClick={() => toggleModal(false)}
              className="absolute right-3 top-2 cursor-pointer text-3xl"
            >
              &times;
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
                value={editedContentData.genres[0]}
                onChange={handleInputChange}
              >
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
                  value={castInput}
                  onChange={handleInputChange}
                />
                <div
                  onClick={handleAddCast}
                  className="inline-block cursor-pointer rounded bg-[#E50914] px-4 py-2 text-white hover:bg-[#d4252e]"
                >
                  Add
                </div>
                {editedContentData.cast.length > 0 && (
                  <div className="flex flex-wrap">
                    {editedContentData.cast.map((castname) => (
                      <div className="relative m-2  rounded  bg-blue-200">
                        <div
                          onClick={() => handleRemoveCast(castname)}
                          className="absolute -top-1 right-1 cursor-pointer"
                        >
                          &times;
                        </div>
                        <p className=" w-fit px-3 py-2">{castname}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label htmlFor="categories"> Content Type:</label>

              <div className="ml-4  flex items-center">
                <label className="">Movie</label>
                <input
                  className="ml-1 mr-4 mt-1"
                  type="radio"
                  name="contentType"
                  required
                  onChange={handleInputChange}
                  value="Movie"
                  checked={editedContentData.contentType === "Movie"}
                />
                <label className="">Series</label>
                <input
                  className="ml-1 mt-1"
                  type="radio"
                  name="contentType"
                  required
                  onChange={handleInputChange}
                  value="Series"
                  checked={editedContentData.contentType === "Series"}
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
                value={editedContentData.releaseDate.substring(0, 10)}
                onChange={handleInputChange}
              />
              <label htmlFor="originCountry"> Origin Country</label>
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
                Update Content Details
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
          </div>
        </div>
      )}
      <div className="flex max-h-[100vh] w-10/12 flex-col items-center gap-5 overflow-y-scroll bg-gray-100 py-4">
        {isLoading ? (
          <div className=" flex items-center justify-center h-screen" role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
        ) : (Object.keys(contentData).length !== 0 ? (
          <>
            <div className="flex w-full gap-4 px-4 py-8">
              <button
                onClick={handleDelete}
                className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white"
              >
                Delete
              </button>
            </div>
            <div className="w-full px-4 ">
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
                    onChange={(e) => handleFileChange(e, 'thumbnail')}
                  />
                  <img
                    className="h-[450px] w-full transition hover:bg-black group-hover:opacity-40"
                    src={contentData.thumbnail[0].thumbnailUrl}
                    alt="thubmnail"
                  />
                  {!isThumbnailUploading ? <BsCloudUpload className="absolute left-[50%] top-[50%] z-10 -translate-x-[50%] -translate-y-[50%] text-8xl opacity-0 transition group-hover:opacity-100" />
                    : (<div className=" absolute left-[50%] top-[50%] z-10 -translate-x-[50%] -translate-y-[50%] " role="status">
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-14 w-14 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                    </div>)}
                </div>
                <div
                  onClick={() => toggleModal(true)}
                  className="my-8 w-fit cursor-pointer rounded bg-green-500 px-3 py-1 text-white"
                >
                  Edit details
                </div>
                {!isDetailsUploading ? (
                  <>
                    <div className="flex gap-2">
                      <h3 className="text-gray-400">{contentData.rating}</h3>
                      <span className="text-2xl text-gray-400">/</span>
                      <h3 className="text-gray-400">{contentData.originCountry}</h3>
                      <span className="text-2xl text-gray-400">/</span>
                      <h3 className="">{contentData.language}</h3>
                      <span className="text-2xl text-gray-400">/</span>
                      <h3 className="">{contentData.genres[0]}</h3>
                      <span className="text-2xl text-gray-400">/</span>
                      <h3 className="">{contentData.contentType}</h3>
                    </div>

                    <div className="my-4 flex gap-4">
                      <h4 className="w-32 text-gray-400">Movie Name:</h4>
                      <h2 className="">{contentData.name}</h2>
                    </div>
                    <div className="my-4 flex gap-4">
                      <h4 className="w-32 text-gray-400">Description:</h4>
                      <h3 className="pl-5">{contentData.description}</h3>
                    </div>
                    <div className="my-4 flex gap-4">
                      <h4 className="w-32 text-gray-400">Cast:</h4>
                      <div>
                        {contentData.cast.map((item, index) => (
                          <h3 key={index} className="">{item}</h3>
                        ))}
                      </div>
                    </div>
                    <div className='flex gap-4 my-4'>
                      <h4 className='text-gray-400 w-32'>Language:</h4>
                      <h3 className=''>{contentData.language}</h3>
                    </div>



                    <div className="my-4 flex gap-4">
                      <h4 className="w-32 text-gray-400">Director:</h4>
                      <h3 className="">{contentData.director}</h3>
                    </div>
                    <div className='flex gap-4 my-4'>
                      <h4 className='text-gray-400 w-32'>Release Date:</h4>
                      <h3 className=''>{contentData.releaseDate.substring(0, 10)}</h3>
                    </div>
                  </>
                ) : (<div className="mx-auto" role="status">
                  <svg
                    aria-hidden="true"
                    className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                  <span className="text-blue-600">Please wait... Details are uploading!</span>
                  <span className="sr-only">Loading...</span>
                </div>)
                }

                <div className="my-4 flex gap-4">
                  <h4 className="w-32 text-gray-400">Trailer:</h4>
                  {
                    !isTrailerUploading ?
                      <>
                        <video
                          width="520"
                          height="440"
                          src={contentData.trailer[0]?.trailerUrl}
                          controls
                        ></video>
                        <div>
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "trailer")}
                            className="h-fit cursor-pointer rounded"
                          />
                        </div>
                      </>
                      :
                      (<div className="" role="status">
                        <svg
                          aria-hidden="true"
                          className="mr-2 h-10 w-10 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                        <span className="text-blue-600">Please wait... content trailer is uploading!</span>
                        <span className="sr-only">Loading...</span>
                      </div>)
                  }
                </div>
                <div className="my-4 flex gap-4">
                  <h4 className="w-32 text-gray-400">Content:</h4>
                  {
                    !isContentUploading ?

                      (
                        <>
                          <video
                            width="520"
                            height="440"
                            src={contentData.contentMovie.movieUrl}
                            controls
                          ></video>
                          <div>
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, "content")}
                              className="h-fit cursor-pointer rounded"
                            />
                          </div>
                        </>)
                      : (
                        <div >      
                        <svg
                          aria-hidden="true"
                          className=" h-10 w-10 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                            
                        <span className="text-blue-600">Please wait... content video is uploading!</span>
                   
                        </div>
                        
                         )
                    }
                </div>



              </form>
            </div>
          </>
        ) : (
          <h2 className="text-white">no data found</h2>
        ))}
      </div>
    </>
  );
};

export default AdminContentView;
