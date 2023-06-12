import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getContentDetailsById } from '../ApiUtils';
const AdminContentView = () => {
  const [contentData, setcontentData] = useState({})
  const params = useParams()
  console.log(params.id)

  useEffect(() => {
    (async function () {
      let result = await getContentDetailsById(params.id)
      console.log(result.data)
      setcontentData(result.data.contentData)
    })();
  }, [])

  return (
    <div className='w-10/12 flex flex-col gap-5 items-center py-4 bg-slate-800 overflow-y-scroll max-h-[100vh]'>
      <h2 className='text-white'>Content</h2>
      {
        Object.keys(contentData).length !== 0 ?
          <div className='text-white w-full p-4'>
            <h2 className=''>{contentData.name}</h2>
            <p className='text-white'>{contentData.description}</p>
          </div>
          : <h2 className='text-white'>Loading..</h2>
      }
    </div>

  )
}

export default AdminContentView