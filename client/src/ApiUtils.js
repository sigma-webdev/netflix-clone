import axiosInstance from "./helpers/axiosInstance";

export const getContentDetailsById = async (id) => {
    try{
      const response = await axiosInstance.get(`/content/posts/${id}`);
      console.log(response)
      return response
    } catch (err) {
      return err.response
    }
  }

  export const deleteContentById = async (id) => {
    try{
      const response = await axiosInstance.delete(`/content/posts/${id}`);
      console.log(response)
      return response
    } catch (err) {
      return err.response
    }
  }
  export const addContent = async (data) => {
    try{
      console.log(data)
      const response = await axiosInstance.post(`/content/posts`, data);
      console.log(response)
      return response
    } catch (err) {
      console.log(err)
      return err.response
    }
  }
  export const updateContentById = async (id, data) => {
    console.log(data)
    try{
      const response = await axiosInstance.put(`/content/posts/${id}`, data);
      console.log(response)
      return response
    } catch (err) {
      return err.response
    }
  }