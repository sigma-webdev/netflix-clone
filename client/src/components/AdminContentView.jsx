import React, { useEffect, useState } from 'react'
import { redirect, useParams, useNavigate } from 'react-router-dom';
import { getContentDetailsById, deleteContentById, updateContentById } from '../ApiUtils';




const AdminContentView = () => {
  const [contentData, setContentData] = useState({})
  const [editedContentData, setEditedContentData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
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
    if(isLoading){
      console.log("please wait till the first submisson got fullfiled or rejected")
      return;
    }
    setIsLoading(true)
    const {name, description, categories, genres,  creator,rating, language,   trailer, content,   cast, thumbnail,episodes } = editedContentData
    const sentFormData = new FormData();
    if(name && name !== contentData.name){
      sentFormData.append("name",name);
    }
    if(description && description !== contentData.description){
      sentFormData.append("description",description);
    }
    if(categories && categories  !== contentData.categories){
      sentFormData.append("categories",categories);
    }
    if(genres && genres !== contentData.genres){
      sentFormData.append("genres",genres);
    }
    if(creator && creator !== contentData.creator){
      sentFormData.append("creator",creator);
    }
    if(rating && rating !== contentData.rating){
      sentFormData.append("rating",rating);
    }
    if(language && language !== contentData.language){
      sentFormData.append("language",language);
    }
    if(trailer && trailer !== contentData.trailer){
      sentFormData.append("trailer",trailer);
    }
    if(content && content !== contentData.content){
      sentFormData.append("content",content);
    }
    if(cast && cast !== contentData.cast){
      sentFormData.append("cast",cast);
    }
    if(thumbnail && thumbnail !== contentData.thumbnail){
      sentFormData.append("thumbnail",thumbnail);
    }
    if(episodes && episodes !== contentData.episodes){
      sentFormData.append("episodes",episodes);
    }
    
  

    updateContentById(params.id, sentFormData)
    .then(()=> setContentData(editedContentData)) 
    .then((res)=> setIsLoading(false))
    .then(()=> setIsOpen(false))
    
    

    // setContentData(editedContentData)
    // toggleModal(false)

  }
  const [isOpen, setIsOpen] = useState(false);


    const toggleModal = (val) => {
        setIsOpen(val)
    }
    // const handleChange =(e)=>{
    //   const { name, value } = e.target;
    //   setEditedContentData(prev=>{
    //     return {...prev, [name]: value }
    //   })
    // }
    const handleInputChange = (event) => {

      const { name, value } = event.target;
      // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setEditedContentData(prevDetails => ({
          ...prevDetails,
          [name]: value
      }));
  };

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      // console.log(file)
      setEditedContentData(prevDetails => ({
          ...prevDetails, 
          [event.target.name]: file
      }));
  };

  return (
    <>
    {
      isOpen &&
    
     <div className='absolute w-full h-full bg-cyan-600 bg-opacity-60 flex items-center justify-center border'>
                    <div className='relative w-96  bg-gray-50  rounded-lg py-12 px-4 max-h-[80%] overflow-y-scroll no-scrollbar'>
                        <div onClick={() => toggleModal(false)} className='absolute top-2 right-3 text-3xl cursor-pointer'>X</div>
                        {/* <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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

                            <button className='bg-green-600 hover:bg-green-700 text-white rounded py-2'>Update Content</button>

                        </form> */}
                        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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
                                <input className='' type="radio" name="categories" required onChange={handleInputChange} value="TV shows" checked={editedContentData.categories === 'TV shows'} />

                            </label>

                            <label htmlFor="creator">  Creator:</label>
                            <input className='bg-transparent border p-2 rounded' type="text"  name="creator" value={editedContentData.creator} onChange={handleInputChange} />
                            <label htmlFor="rating">  Rating:</label>
                            <input className='bg-transparent border p-2 rounded' type="text"  name="rating" value={editedContentData.rating} onChange={handleInputChange} />
                            <label htmlFor="language">  Language:</label>
                            <input className='bg-transparent border p-2 rounded' type="text"  name="language" value={editedContentData.language} onChange={handleInputChange} />
                            <label htmlFor="thumbnail">  Thumbnail:</label>
                            {editedContentData.thumbnail && <p className='w-80 break-words'>Existing File: <span className='text-blue-600'>{contentData.thumbnail[0].thumbnailUrl}</span></p>}
                            <input className='bg-transparent border p-2 rounded' type="file"  name="thumbnail" accept="image/*" onChange={handleFileChange} />
                            <label htmlFor="trailer">  Trailer:</label>
                            {editedContentData.trailer && <p className='w-80 break-words'>Existing File: <span className='text-blue-600'>{contentData.trailer[0].trailerUrl}</span></p>}
                            <input className='bg-transparent border p-2 rounded' type="file"  name="trailer" accept="video/*" onChange={handleFileChange} />
                            <label htmlFor="content">  Content:</label>
                            {editedContentData.content && <p className='w-80 break-words'>Existing File: <span className='text-blue-600'>{contentData.content[0].contentURL}</span></p>}
                            <input className='bg-transparent border p-2 rounded' type="file"  name="content" accept="video/*" onChange={handleFileChange} />
                            

                            <button type='submit' disabled={isLoading}  className='bg-green-600 hover:bg-greean-700 text-white rounded py-2 flex items-center gap-4 justify-center'>Add Content {isLoading && 
                            <div role="status">
                            <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>} </button>

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
            <div >

          
            <div className='flex gap-2'>
              <h3 className='text-gray-300'>{contentData.rating}</h3>
              <h3>/</h3>
              <h3 className=''>{contentData.language}</h3>
              <h3>/</h3>
              <h3 className=''>{contentData.genres}</h3>
              <h3>/</h3>
              <h3 className=''>{contentData.categories}</h3>
            </div>
            <div>
            <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Movie Name:</h4>
              <h2 className=''>{contentData.name}</h2>
            </div>
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
            {/* <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Language:</h4>
              <h3 className=''>{contentData.language}</h3>
              
              
            </div> */}
            </div>
            <div>

            <div className='flex gap-4 my-4'>
              <h4 className='text-gray-400 w-32'>Creators:</h4>
              <div>
                {contentData.creator.map(item => <h3 className='text-white'>{item}</h3>)}
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
          </div>
          : <h2 className='text-white'>Loading..</h2>
        }

    </div>

        </>
  )
}

export default AdminContentView