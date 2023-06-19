import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BiSearchAlt2 } from "react-icons/bi";
import { fetchContent } from '../store/contentSlice';
import { Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import AdminContentView from './AdminContentView';
import { addContent } from '../ApiUtils';
import { formLoader } from './icons';


const AdminManageContents = () => {

    // const [contentData, setContentData] = useState([])
    const [newContentData, setNewContentData] = useState({
        name: "",
        description: "",
        categories: "",
        genres: "",
        creator: "",
        rating: "",
        language: "",
        trailer: null,
        content: null,
        cast: "",
        thumbnail: null,
        episodes: []

    })
    const [castArr, setCastArr] = useState([])
    const [isLoading, setIsLoading] = useState(false);



    const dispatch = useDispatch();

    const content = useSelector((state) => state.content.allContent)
    const [searchTerm, setSearchTerm] = useState('');
    const isContentLoading = useSelector((state) => state.content.loading)
    // console.log(content)

    useEffect(() => {
        dispatch(fetchContent());
        // setContentData(content)
    }, [dispatch])

    // useEffect(() => {

    //     setContentData(content)
    // }, [content])

    const [isOpen, setIsOpen] = useState(false);


    const toggleModal = (val) => {
        setIsOpen(val)
    }
    const handleInputChange = (event) => {
        console.log(event.target.name)
        const { name, value } = event.target;
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
        setNewContentData(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };
    const handleArrayChange = () => {
        setCastArr([...castArr, newContentData.cast])
        setNewContentData({
            ...newContentData,
            cast: ''
        })
    }
    const handleRemoveCast = (castname) => {
        let newCast = castArr.filter(item => item !== castname)
        setCastArr(newCast)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // console.log(file)
        setNewContentData(prevDetails => ({
            ...prevDetails,
            [event.target.name]: file
        }));
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };
    
      const filteredData = content.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.genres.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        if (isLoading) {
            console.log("please wait till the first submisson got fullfiled or rejected")
            return;
        }
        setIsLoading(true)

        const { name, description, categories, genres, creator, rating, language, trailer, content, thumbnail, episodes } = newContentData
        const sentFormData = new FormData();

        sentFormData.append("name", name);
        sentFormData.append("description", description)
        sentFormData.append("categories", categories)
        sentFormData.append("genres", genres)
        sentFormData.append("creator", creator)
        sentFormData.append("rating", rating)
        sentFormData.append("language", language)
        sentFormData.append("trailer", trailer)
        sentFormData.append("content", content)
        sentFormData.append("cast", castArr)
        sentFormData.append("thumbnail", thumbnail)
        sentFormData.append("episodes", episodes)

        const res = await addContent(sentFormData)
        setNewContentData({
            name: "",
            description: "",
            categories: "",
            genres: "",
            creator: "",
            rating: "",
            language: "",
            trailer: null,
            content: null,
            cast: "",
            thumbnail: null,
            episodes: []
        })
        setCastArr([])
        dispatch(fetchContent());
        setIsLoading(false)
        setIsOpen(false)
        console.log(res.status)
    }

    const handleToggleClose = () => {
        setCastArr([])
        setNewContentData({
            name: "",
            description: "",
            categories: "",
            genres: "",
            creator: "",
            rating: "",
            language: "",
            trailer: null,
            content: null,
            cast: "",
            thumbnail: null,
            episodes: []
        })
        toggleModal(false)
    }
    return (
        <>


            {isOpen &&
                <div className='absolute w-full h-full bg-black bg-opacity-60 flex items-center justify-center '>
                    <div className='relative w-[700px]  bg-gray-50  rounded-lg py-12 px-4 max-h-[80%] overflow-y-scroll no-scrollbar'>
                        <div onClick={handleToggleClose} className='absolute top-2 right-3 text-3xl cursor-pointer'>X</div>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                            <label htmlFor="name">Movie Name:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" required name="name" value={newContentData.name} onChange={handleInputChange} />
                            <label htmlFor="genres">Genres:</label>
                            <select className='bg-transparent border p-2 rounded' name="genres" value={newContentData.genres} onChange={handleInputChange}>
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
                            <input className='bg-transparent border p-2 rounded' type="text" required name="description" value={newContentData.description} onChange={handleInputChange} />
                            <label htmlFor="cast">Cast:</label>
                            <div>
                                <input className='bg-transparent border p-2 rounded mr-4 w-[88%]' type="text" name="cast" value={newContentData.cast} onChange={handleInputChange} />
                                <div onClick={handleArrayChange} className='bg-[#E50914] hover:bg-[#d4252e] text-white px-4 py-2 rounded inline-block cursor-pointer'>Add</div>
                            </div>
                            {
                                castArr.length > 0 &&
                                <div className='flex flex-wrap'>
                                    {
                                        castArr.map(castname => <div className='bg-blue-200 m-2  rounded  relative'>
                                            <div onClick={() => handleRemoveCast(castname)} className='absolute right-1 -top-1 cursor-pointer' >x</div>
                                            <p className=' w-fit px-3 py-2'>{castname}</p>
                                        </div>
                                        )
                                    }
                                </div>
                            }


                            <label htmlFor="categories">  Categories:</label>


                            <div className='flex  items-center ml-4'>
                                <label className=''>
                                    Movies
                                </label>
                                <input className='mt-1 mr-4 ml-1' type="radio" name="categories" required onChange={handleInputChange} value="Movies" checked={newContentData.categories === 'Movies'} />
                                <label className=''>
                                    TV shows
                                </label>
                                <input className='mt-1 ml-1' type="radio" name="categories" required onChange={handleInputChange} value="TV shows" checked={newContentData.categories === 'TV shows'} />
                            </div>

                            <label htmlFor="creator">  Creator:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" required name="creator" value={newContentData.creator} onChange={handleInputChange} />
                            <label htmlFor="rating">  Rating:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" required name="rating" value={newContentData.rating} onChange={handleInputChange} />
                            <label htmlFor="language">  Language:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" required name="language" value={newContentData.language} onChange={handleInputChange} />
                            <label htmlFor="thumbnail">  Thumbnail:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" required name="thumbnail" accept="image/*" onChange={handleFileChange} />
                            <label htmlFor="trailer">  Trailer:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" required name="trailer" accept="video/*" onChange={handleFileChange} />
                            <label htmlFor="content">  Content:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" required name="content" accept="video/*" onChange={handleFileChange} />


                            <button type='submit' disabled={isLoading} className='bg-[#E50914] hover:bg-[#d4252e] text-white rounded py-2 flex items-center gap-4 justify-center'>Add Content {isLoading &&
                                <div role="status">
                                    <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>} </button>

                        </form>
                    </div>
                </div>
            }
            {
                isContentLoading ?
                    <div className='absolute w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center'>
                        <div class="text-center">
                            <div role="status">
                                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                    :
                    (
                        <div className='w-10/12 flex flex-col gap-5 items-center py-4 bg-[#181818fd] overflow-y-scroll max-h-[100vh] px-4'>
                            <h2 className='text-white'>Manage Contents</h2>
                            <div className='flex w-full justify-between'>
                                <div className='text-white relative w-[30%]'>
                                <input className='bg-transparent border rounded-lg pl-4 py-1 w-full' placeholder='Search content...'type="text" value={searchTerm} onChange={handleSearch}/>
                                <BiSearchAlt2  className='absolute right-1 top-2'/>
                                </div>
                                <button onClick={() => toggleModal(true)} className='px-3 py-1 bg-[#E50914] hover:bg-[#d4252e] cursor-pointer rounded text-white'>Add Content</button>
                            </div>
                            {
                                filteredData.length > 0 ?
                                    <table className="table-auto w-5/6 overflow-scroll text-gray-200 border border-gray-300">
                                        <thead className="text-left">
                                            <tr>
                                                <th className="px-4 py-2">S. No</th>
                                                <th className="px-4 py-2">Name</th>
                                                <th className="px-4 py-2">Categories</th>
                                                <th className="px-4 py-2">Genres</th>
                                                <th className="px-4 py-2">Status</th>
                                                <th className="px-4 py-2 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className=" border-opacity-0">
                                            {
                                                filteredData.map((content, index) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className={
                                                                (index + 1) % 2 === 0 ? "bg-[#2b2c34]" : "bg-[#2e2f3a]"
                                                            }
                                                        >
                                                            <td className="px-4 py-3">{index + 1}</td>
                                                            <td className="px-4 py-3 flex items-center gap-4">
                                                                <img className='w-32 h-16 rounded-xl object-center' src={content?.thumbnail[0]?.thumbnailUrl} alt="" />
                                                                {content.name}</td>
                                                            <td className="px-4 py-3">{content.categories}</td>
                                                            <td className="px-4 py-3">{content.genres}</td>
                                                            <td className="px-4 py-3">{content.genres}</td>
                                                            <td className="px-4 py-2">
                                                                <Link to={`${content._id}`}>
                                                                    <div onClick={toggleModal} className='py-2 text-center bg-[#E50914] hover:bg-[#d4252e] text-white font-bold rounded cursor-pointer' >
                                                                        View
                                                                    </div>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );

                                                })
                                            }
                                        </tbody>
                                    </table>
                                    : <h2 className='text-center text-white'>No Data Found</h2>}
                        </div>

                    )}
        </>

    )
}

export default AdminManageContents