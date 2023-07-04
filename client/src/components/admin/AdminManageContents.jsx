import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  addNewContent,
  fetchContentBySearch,
} from "../../store/adminSlice";
// import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// import AdminContentView from "./AdminContentView";
// import { addContent } from '../../ApiUtils';
// import { useNavigate } from "react-router-dom";
// import { formLoader } from './icons';

const AdminManageContents = () => {
  // const navigate = useNavigate();

  // const [contentData, setContentData] = useState([])
  const [newContentData, setNewContentData] = useState({
    name: "",
    description: "",
    contentType: "",
    genres: [],
    director: "",
    rating: "",
    language: "",
    cast: "",
    releaseDate: "",
    originCountry: "",
  });
  const [castArr, setCastArr] = useState([]);
  const [creatorArr, setCreatorArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1) 

  const dispatch = useDispatch();

  const allContents = useSelector((state) => state.admin.filteredContent);
  console.log(allContents.contents, "/dasd");
  const [searchTerm, setSearchTerm] = useState("");
  const isContentLoading = useSelector((state) => state.admin.isLoading);
  // console.log(content)
console.log(isContentLoading)
  useEffect(() => {
    dispatch(fetchContentBySearch({pageNo: page}));
    // setContentData(content)
  }, [page]);


  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (val) => {
    setIsOpen(val);
  };

  const handleInputChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value, "//////");
    const { name, value } = event.target;
    if (name === "genres") {
      setNewContentData({
        ...newContentData,
        genres: [...newContentData.genres, value],
      });

      return;
    }
    // if (name === "cast") {
    //     const Arr = [...newContentData, value]
    //     console.log(Arr)
    //     setNewContentData(prev => ({
    //         ...prev,
    //         [name]: Arr

    //     }))
    //     return;
    // }
    // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setNewContentData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };



  const handleArrayChange = () => {
    setCastArr([...castArr, newContentData.cast]);
    setNewContentData({
      ...newContentData,
      cast: "",
    });
  };
  const handleRemoveCast = (castname) => {
    let newCast = castArr.filter((item) => item !== castname);
    setCastArr(newCast);
  };
  const getSearch = (e) => {
    e.preventDefault()
    dispatch(fetchContentBySearch({searchText: searchTerm }));
    setSearchTerm("")

  }

  // const handleFileChange = (event) => {
  //     const file = event.target.files[0];
  //     // console.log(file)
  //     setNewContentData(prevDetails => ({
  //         ...prevDetails,
  //         [event.target.name]: file
  //     }));
  // };


  // const filteredData = content.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  
  // );

  const nextPage = () => {
    if(allContents.next === undefined){
      return
    }else{
      setPage((next)=>(next+1))

    }

  }
  const prevPage = () =>{
    if(allContents.previous === undefined){
      return;
    
    }else {
      setPage((pre)=>pre-1)
 
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (isLoading) {
      console.log(
        "please wait till the first submisson got fullfiled or rejected"
      );
      return;
    }
    setIsLoading(true);
    // const sentFormData = new FormData(e.target);
    // sentFormData.append("creator", creatorArr);
    // sentFormData.append("cast", castArr);
    // console.log(sentFormData)
    const data = { ...newContentData, cast: castArr };
    console.log(data);
    dispatch(addNewContent(data));
    setNewContentData({
      name: "",
      description: "",
      contentType: "",
      genres: [],
      director: "",
      rating: "",
      language: "",
      cast: "",
      releaseDate: "",
      originCountry: "",
    });
    setCastArr([]);
    setIsOpen(false);
    setIsLoading(false);
    // navigate(contents._id)
    // console.log(res)
  };

  const handleToggleClose = () => {
    setCastArr([]);
    setNewContentData({
      name: "",
      description: "",
      contentType: "",
      genres: [],
      director: "",
      rating: "",
      language: "",
      cast: "",
      releaseDate: "",
      originCountry: "",
    });
    toggleModal(false);
  };
  return (
    <>
      {isOpen && (
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-60 ">
          <div className="no-scrollbar relative  max-h-[80%]  w-[700px] overflow-y-scroll rounded-lg bg-gray-50 px-4 py-12">
            <div
              onClick={handleToggleClose}
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
                value={newContentData.name}
                onChange={handleInputChange}
              />
              <label htmlFor="genres">Genres:</label>
              <select
                className="rounded border bg-transparent p-2"
                name="genres"
                value={newContentData.genres}
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
                value={newContentData.description}
                onChange={handleInputChange}
              />
              <label htmlFor="cast">Cast:</label>
              <div>
                <input
                  className="mr-4 w-[88%] rounded border bg-transparent p-2"
                  type="text"
                  name="cast"
                  value={newContentData.cast}
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

              <label htmlFor="contentType"> Content Type:</label>

              <div className="ml-4  flex items-center">
                <label className="">Movie</label>
                <input
                  className="ml-1 mr-4 mt-1"
                  type="radio"
                  name="contentType"
                  required
                  onChange={handleInputChange}
                  value="Movie"
                  checked={newContentData.contentType === "Movie"}
                />
                <label className="">Series</label>
                <input
                  className="ml-1 mt-1"
                  type="radio"
                  name="contentType"
                  required
                  onChange={handleInputChange}
                  value="Series"
                  checked={newContentData.contentType === "Series"}
                />
              </div>

              <label htmlFor="creator"> Director:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="director"
                value={newContentData.director}
                onChange={handleInputChange}
              />
              <label htmlFor="rating"> Rating:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="rating"
                value={newContentData.rating}
                onChange={handleInputChange}
              />
              <label htmlFor="language"> Language:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="language"
                value={newContentData.language}
                onChange={handleInputChange}
              />
              <label htmlFor="releaseDate"> Release Date:</label>
              <input
                className="rounded border bg-transparent p-2"
                type="date"
                required
                name="releaseDate"
                value={newContentData.releaseDate}
                onChange={handleInputChange}
              />
              <label htmlFor="releaseDate"> Origin Country</label>
              <input
                className="rounded border bg-transparent p-2"
                type="text"
                required
                name="originCountry"
                value={newContentData.originCountry}
                onChange={handleInputChange}
              />
              {/* <label htmlFor="thumbnail">  Thumbnail:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" required name="thumbnail" accept="image/*" onChange={handleFileChange} />
                            <label htmlFor="trailer">  Trailer:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" required name="trailer" accept="video/*" onChange={handleFileChange} />
                            <label htmlFor="content">  Content:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" required name="content" accept="video/*" onChange={handleFileChange} /> */}


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
          </div>
        </div>
      )}
      {isContentLoading ? (
        <div className="absolute right-0 flex h-screen w-10/12 items-center justify-center bg-opacity-80">
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200  dark:text-gray-600"
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
          </div>
        </div>
      ) : (
        <div className="flex max-h-[100vh] w-10/12 flex-col items-center overflow-y-scroll  px-4 py-4">
          <div className="flex justify-between w-5/6 mx-auto">
            <h3 className="text-white bg-[#E50914] px-3 rounded-t-md">Manage Contents</h3>
            <div className="flex gap-2">
            <button
              onClick={() => toggleModal(true)}
              className="cursor-pointer bg-[#E50914] px-3 py-1 text-white hover:bg-[#d4252e]  border-b-2 rounded-lg border-white"
            >
              Add Content
            </button>
              {/* <div className=""> */}
              <form onSubmit={getSearch} className="flex justify-between border-2 border-[#E50914] items-center  bg-white">
                <input
                  className=" px-2 outline-none w-full"
                  placeholder="Search content..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>

              <BiSearchAlt2 className="text-4xl" />
                </button>
              </form>
            {/* </div> */}
            
            
            </div>
          </div>

          { allContents.contents ? (
            <>
            <table className="w-5/6 table-auto overflow-scroll text-gray-200">
              <thead className="text-left">
                <tr className="bg-[#E50914]">
                  <th className="px-4 py-2">S. No</th>
                  <th className="px-4 py-2 text-center">Name</th>
                  <th className="px-4 py-2">Content Type</th>
                  <th className="px-4 py-2">Genres</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className=" border-opacity-0">
                {allContents.contents.map((content, index) => {
                  return (
                    <tr
                      key={index}
                      className={
                        (index + 1) % 2 === 0 ? "bg-[#342e2b]" : "bg-[#2e2f3a]"
                      }
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="flex items-center gap-4 px-4 py-3">
                        <img
                          className="h-16 w-32 rounded-xl object-center"
                          src={content?.thumbnail[0].thumbnailUrl}
                          alt=""
                        />
                        {content.name}
                      </td>
                      <td className="px-4 py-3">{content.contentType}</td>
                      <td className="px-4 py-3">{content.genres}</td>
                      <td className="px-4 py-3">{content.genres}</td>
                      <td className="px-4 py-2">
                        <Link to={`${content._id}`}>
                          <div className="cursor-pointer rounded bg-[#E50914] py-2 text-center font-bold text-white hover:bg-[#d4252e]">
                            View
                          </div>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between w-10/12 my-5 mx-auto">
            <button className={allContents.previous === undefined ? "bg-[#e5091451]  text-white  py-1 px-2 cursor-not-allowed":"bg-[#E50914] hover:bg-[#d4252e] text-white  py-1 px-2"} onClick={prevPage}>Previous Page</button>
            <div className=" px-[10px] border-2 border-[#e509144d] text-[#E50914] text-xl font-bold rounded-full ">
             {page}
            </div>
            <button onClick={nextPage} className={allContents.next === undefined? "bg-[#e5091451]  text-white  py-1 px-2 cursor-not-allowed":"bg-[#E50914] hover:bg-[#d4252e] text-white  py-1 px-4"}>Next Page</button>
          </div>
          </>
          ) : (
            <h2 className="text-center">No Data Found</h2>
          )}
        </div>
      )}
    </>
  );
};

export default AdminManageContents;
