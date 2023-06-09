import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchContent } from '../store/contentSlice';
import { Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import AdminContentView from './AdminContentView';

const AdminManageContents = () => {

    const [contentData, setContentData] = useState([])


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


    return (
        <>
            {
                isOpen &&
                <div className='absolute w-full h-full bg-cyan-600 bg-opacity-60 flex items-center justify-center border'>
                    <div className='relative w-96  bg-gray-50  rounded-lg py-12 px-4 max-h-[80%] overflow-y-scroll no-scrollbar'>
                        <div onClick={() => toggleModal(false)} className='absolute top-2 right-3 text-3xl cursor-pointer'>X</div>
                        <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-2'>
                            <label htmlFor="name">Movie Name:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="name" id="name" value="Nasikh CL" />
                            <label htmlFor="name">Description:</label>
                            <input className='bg-transparent border p-2 rounded' type="email" name="email" id="email" value="nasikh@ineuron.ai" />
                            <label htmlFor="name">Cast:</label>
                            <input className='bg-transparent border p-2 rounded' type="tel" name="phone" id="phone" value="9988998781" />
                            <label htmlFor="name">  Categories:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />
                            <label htmlFor="name">  Likes:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />
                            <label htmlFor="name">  Creator:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />
                            <label htmlFor="name">  Raiting:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />
                            <label htmlFor="name">  Language:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />
                            <label htmlFor="name">  Thumbnail:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />
                            <label htmlFor="name">  Trailer:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />
                            <label htmlFor="name">  Content:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />
                            <label htmlFor="name">  Episodes:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" />

                            <button className='bg-red-600 hover:bg-red-700 text-white rounded py-2'>Delete Content</button>

                        </form>
                    </div>
                </div>
            }
            <div className='w-10/12 flex flex-col gap-5 items-center py-4 bg-slate-800 overflow-y-scroll max-h-[100vh]'>
                <h2 className='text-white'>Manage Contents</h2>
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
                                            <Link to={`content/${content._id}`}>
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
            <Routes>
                <Route path=":id" element={<AdminContentView />} />
            </Routes>
        </>

    )
}

export default AdminManageContents