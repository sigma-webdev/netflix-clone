import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchContent } from '../store/contentSlice';
import { Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import AdminContentView from './AdminContentView';
import { addContent } from '../ApiUtils';

const AdminManageContents = () => {

    const [contentData, setContentData] = useState([])
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


    const dispatch = useDispatch();

    const content = useSelector((state) => state.content.allContent)
    // console.log(content)

    useEffect(() => {
        dispatch(fetchContent())
    }, [])

    useEffect(() => {

        setContentData(content)
    }, [content])

    const [isOpen, setIsOpen] = useState(false);


    const toggleModal = (val) => {
        setIsOpen(val)
    }
    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setNewContentData(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // console.log(file)
        setNewContentData(prevDetails => ({
            ...prevDetails,
            [event.target.name]: file
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name, description, categories, genres,  creator,rating, language,   trailer, content,   cast, thumbnail,episodes } = newContentData
        const sentFormData = new FormData();

        sentFormData.append("name",name);
        sentFormData.append("description",description)
        sentFormData.append("categories",categories)
        sentFormData.append("genres",genres)
        sentFormData.append("creator",creator)
        sentFormData.append("rating",rating)
        sentFormData.append("language",language)
        sentFormData.append("trailer",trailer)
        sentFormData.append("content",content)
        sentFormData.append("cast",cast)
        sentFormData.append("thumbnail",thumbnail)
        sentFormData.append("episodes",episodes)
        
           addContent(sentFormData).then(
             toggleModal(false)
           )  
    }


    return (
        <>
            {
                isOpen &&
                <div className='absolute w-full h-full bg-cyan-600 bg-opacity-60 flex items-center justify-center border'>
                    <div className='relative w-[500px]  bg-gray-50  rounded-lg py-12 px-4 max-h-[80%] overflow-y-scroll no-scrollbar'>
                        <div onClick={() => toggleModal(false)} className='absolute top-2 right-3 text-3xl cursor-pointer'>X</div>
                        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2'>
                            <label htmlFor="name">Movie Name:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="name" value={newContentData.name} onChange={handleInputChange} />
                            <label htmlFor="genres">Genres:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="genres" value={newContentData.genres} onChange={handleInputChange} />
                            <label htmlFor="text">Description:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="description" value={newContentData.description} onChange={handleInputChange} />
                            <label htmlFor="cast">Cast:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="cast" value={newContentData.cast} onChange={handleInputChange} />
                            <label htmlFor="categories">  Categories:</label>
                            <label className=''>
                                Movies
                                <input className='' type="radio" name="categories" onChange={handleInputChange} value="Movies" checked={newContentData.categories === 'Movies'} />

                            </label>
                            <label>
                                Series
                                <input className='' type="radio" name="categories" onChange={handleInputChange} value="Series" checked={newContentData.categories === 'Series'} />

                            </label>

                            <label htmlFor="creator">  Creator:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="creator" value={newContentData.creator} onChange={handleInputChange} />
                            <label htmlFor="rating">  Rating:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="rating" value={newContentData.rating} onChange={handleInputChange} />
                            <label htmlFor="language">  Language:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="language" value={newContentData.language} onChange={handleInputChange} />
                            <label htmlFor="thumbnail">  Thumbnail:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} />
                            <label htmlFor="trailer">  Trailer:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" name="trailer" accept="video/*" onChange={handleFileChange} />
                            <label htmlFor="content">  Content:</label>
                            <input className='bg-transparent border p-2 rounded' type="file" name="content" accept="video/*" onChange={handleFileChange} />
                            {/* <label htmlFor="name">  Episodes:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value={newContentData.epis} /> */}

                            <button type='submit' className='bg-green-600 hover:bg-greean-700 text-white rounded py-2'>Add Content</button>

                        </form>
                    </div>
                </div>
            }
            <div className='w-10/12 flex flex-col gap-5 items-center py-4 bg-slate-800 overflow-y-scroll max-h-[100vh] px-4'>
                <h2 className='text-white'>Manage Contents</h2>
                <button onClick={() => toggleModal(true)} className='px-3 py-1 bg-green-500 cursor-pointer rounded self-end text-white'>Add Content</button>
                <table className="table-auto w-5/6 overflow-scroll text-gray-200 border border-gray-300">
                    <thead className="text-left">
                        <tr>
                            <th className="px-4 py-2">S. No</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Categories</th>
                            <th className="px-4 py-2">Genres</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className=" border-opacity-0">
                        {contentData.length > 0 &&
                            contentData.map((content, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={
                                            (index + 1) % 2 === 0 ? "bg-[#2b2c34]" : "bg-[#2e2f3a]"
                                        }
                                    >
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3">{content.name}</td>
                                        <td className="px-4 py-3">{content.categories}</td>
                                        <td className="px-4 py-3">{content.genres}</td>
                                        <td className="px-4 py-2">
                                            <Link to={`${content._id}`}>
                                                <div onClick={toggleModal} className='py-2 text-center bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded cursor-pointer' >
                                                    View
                                                </div>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            {/* <Routes>
                <Route path=":id" element={<AdminContentView />} />
            </Routes> */}
        </>

    )
}

export default AdminManageContents