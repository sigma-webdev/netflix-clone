import axiosInstance from "./helpers/axiosInstance";

export const getContentDetailsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/content/${id}`);
    console.log(response);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const deleteContentById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/content/${id}`);
    console.log(response);
    return response;
  } catch (err) {
    return err.response;
  }
};
export const addContent = async (data) => {
  try {
    console.log(data);
    const response = await axiosInstance.post(`/content`, data);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
export const updateContentById = async (id, data) => {
  console.log(data);
  try {
    const response = await axiosInstance.put(`/content/${id}`, data, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        // onProgress(progress);
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    return err.response;
  }
};
