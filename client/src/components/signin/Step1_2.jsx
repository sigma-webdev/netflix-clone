import React from 'react'

const Step1 = () => {
  return (
    <div className="flex justify-center">
    <div>
      <div>STEP 1 OF 3</div>
      <div className="text-2xl font-bold">
        Welcome back! <br />
        Joining Netflix is easy.
      </div>
      <div>Enter your password and you'll be watching in no time.</div>
      <form>
          <div className="my-4">
              <label>Email</label>
              <br />
              <input type="email" name="email" id="email" value="nasikh@ineuron.ai" />
          </div>
          <div class="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            class="block py-3 border border-black  w-[430px] px-4 rounded  text-black pt-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm px-4 z-10 text-[#717171] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
           Password
          </label>
        </div>
        <div className="text-blue-500 mb-4"> 
          Forgot your password?
        </div>
        <div className="bg-[#E50914] rounded text-white text-xl  w-[430px] text-center py-3">Next</div>
          
      </form>
    </div>
  </div>
  )
}

export default Step1