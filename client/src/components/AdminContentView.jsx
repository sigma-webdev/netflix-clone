import React, { useEffect, useState } from 'react'
import { redirect, useParams, useNavigate } from 'react-router-dom';
import { getContentDetailsById, deleteContentById } from '../ApiUtils';
const AdminContentView = () => {
  const [contentData, setContentData] = useState({})
  const [editedContentData, setEditedContentData] = useState({})
  const params = useParams()
  console.log(params.id)
  const navigate = useNavigate()

  useEffect(() => {
    (async function () {
      let result = await getContentDetailsById(params.id)
      console.log(result.data)
      setContentData(result.data.contentData)
      setEditedContentData(result.data.contentData)
      
    })();
  }, [])

  const handleDelete = async () => {
    console.log('delete this')
    navigate('/admin/managecontents')
    // redirect('/admin/managecontents/')
    deleteContentById(contentData._id).then(
      navigate('/admin/managecontents')
    )
    //   redirect('/admin/managecontents')

  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setContentData(editedContentData)
    toggleModal(false)

  }
  const [isOpen, setIsOpen] = useState(false);


    const toggleModal = (val) => {
        setIsOpen(val)
    }
    const handleChange =(e)=>{
      const { name, value } = e.target;
      setEditedContentData(prev=>{
        return {...prev, [name]: value }
      })
    }

  return (
    <>
    {
      isOpen &&
    
     <div className='absolute w-full h-full bg-cyan-600 bg-opacity-60 flex items-center justify-center border'>
                    <div className='relative w-96  bg-gray-50  rounded-lg py-12 px-4 max-h-[80%] overflow-y-scroll no-scrollbar'>
                        <div onClick={() => toggleModal(false)} className='absolute top-2 right-3 text-3xl cursor-pointer'>X</div>
                        <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-2'>
                            <label htmlFor="name">Movie Name:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="name" id="name" value={editedContentData.name} onChange={(e)=>{handleChange(e)}} />
                            <label htmlFor="description">Description:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="description" id="email" value={editedContentData.description} />
                            <label htmlFor="name">Cast:</label>
                            <input className='bg-transparent border p-2 rounded' type="tel" name="phone" id="phone" value={editedContentData.cast} />
                            <label htmlFor="categories">  Categories:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="categories" id="plan" value={editedContentData.categories} onChange={(e)=>{handleChange(e)}} />
                            <label htmlFor="name">  Raiting:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value={editedContentData.rating} />
                            <label htmlFor="name">  Language:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value={editedContentData.language} />
                            <label htmlFor="name">  Thumbnail:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value={editedContentData.thumbnail[0].thumbnailUrl} />
                            <label htmlFor="name">  Trailer:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value={editedContentData.trailer[0].trailerUrl} />
                            <label htmlFor="name">  Content:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value={editedContentData.content[0].contentURL} />
                            {/* <label htmlFor="name">  Episodes:</label>
                            <input className='bg-transparent border p-2 rounded' type="text" name="plan" id="plan" value="NONE" /> */}

                            <button className='bg-green-600 hover:bg-green-700 text-white rounded py-2'>Update Content</button>

                        </form>
                    </div>
                </div>
}
    <div className='w-10/12 flex flex-col gap-5 items-center py-4 bg-slate-800 overflow-y-scroll max-h-[100vh]'>
      <h2 className='text-white'>Content</h2>
      <div className='flex gap-4 w-full px-4'>
        <button onClick={()=>toggleModal(true)} className='px-3 py-1 bg-green-500 cursor-pointer rounded text-white'>Edit</button>
        <button onClick={handleDelete} className='px-3 py-1 bg-red-500 cursor-pointer rounded text-white'>Delete</button>
      </div>
      {
        Object.keys(contentData).length !== 0 ?
        <div className='text-white w-full px-4'>
            <img className='w-full h-[450px]' src={contentData.thumbnail[0].thumbnailUrl} alt="" />
            <div className='flex gap-2'>
              <h3 className='text-gray-300'>{contentData.rating}</h3>
              <h3>/</h3>
              <h3 className=''>{contentData.language}</h3>
              <h3>/</h3>
              <h3 className=''>{contentData.genres}</h3>
              <h3>/</h3>
              <h3 className=''>{contentData.categories}</h3>
            </div>
            <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Movie Name:</h4>
              <h2 className=''>{contentData.name}</h2>
            </div>
            {/* <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Language:</h4>
              <h3 className=''>{contentData.language}</h3>
              
              
            </div> */}
            <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Description:</h4>
              <h3 className=''>{contentData.description}</h3>
            </div>
            <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Cast:</h4>
              <div>
                {contentData.cast.map(item => <h3 className='text-white'>{item}</h3>)}
              </div>
            </div>
            <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Trailer:</h4>
              <video width="520" height="440" src={contentData.trailer[0].trailerUrl} controls></video>
            </div>
            <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Content:</h4>
              <video width="520" height="440" src={contentData.content[0].contentURL} controls></video>
            </div>
            {/* <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Genres:</h4>
              <h3 className=''>{contentData.genres}</h3>
            </div> */}
            {/* <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Categories:</h4>
              <h3 className=''>{contentData.categories}</h3>
            </div> */}


          </div>
          : <h2 className='text-white'>Loading..</h2>
        }

    </div>

        </>
  )
}

export default AdminContentView