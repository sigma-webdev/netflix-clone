import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  filteredContent: {},
  currentContent: {},
  isLoading: false,
  isDetailsUploading: false,
  isThumbnailUploading: false,
  isTrailerUploading: false,
  isContentUploading: false,
  isDisplayToggleLoading: false,
};

// fetch All content and fetch content by search text
export const fetchContents = createAsyncThunk(
  "content/fetchContentBySearch",
  async ({ pageNo, searchText }) => {
    try {
      const url = searchText
        ? `/contents?search=${searchText}`
        : `/contents?page=${pageNo}&limit=5`;
      const response = await axiosInstance.get(url);
      const data = response?.data?.data;
      return data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

// fetch content by id
export const fetchContentById = createAsyncThunk(
  "content/fetchContentById",
  async ({ contentId }) => {
    try {
      const response = await axiosInstance.get(`/contents/${contentId}`);
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

//  add new content
export const addNewContent = createAsyncThunk(
  "content/addNewContent",
  async (newContent) => {
    try {
      const response = await axiosInstance.post(`/contents`, newContent);
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

//  update content by id
export const updateContentDetailsById = createAsyncThunk(
  "content/updateContentDetailsById",
  async ({ id, newData }) => {
    try {
      const response = await axiosInstance.put(`/contents/${id}`, newData);
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

// update toggle display content to user
export const ToggleDisplayContentToUser = createAsyncThunk(
  "content/ToggleDisplayContentToUser",
  async ({ id, val }) => {
    try {
      const response = await axiosInstance.put(`/contents/${id}`, {
        display: val,
      });
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

//  update content thumbnail by id
export const updateContentThumbnailById = createAsyncThunk(
  "content/updateContentThumbnailById",
  async ({ id, newData }) => {
    try {
      const response = await axiosInstance.put(`/contents/${id}`, newData);
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

//  update content video by id
export const updateContentVideoById = createAsyncThunk(
  "content/updateContentVideoById",
  async ({ id, newData }) => {
    try {
      const response = await axiosInstance.put(`/contents/${id}`, newData);
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

//  update content video by id
export const updateContentTrailerById = createAsyncThunk(
  "content/updateContentTrailerById",
  async ({ id, newData }) => {
    try {
      const response = await axiosInstance.put(`/contents/${id}`, newData);
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

// delete content by id
export const deleteContentById = createAsyncThunk(
  "content/deleteContentById",
  async (contentId) => {
    try {
      const response = await axiosInstance.delete(`/contents/${contentId}`);
      const data = response.data.contentData;
      return { data, contentId };
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

export const adminManageContentsSlice = createSlice({
  name: "manageContents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch All content and fetch content by search text
      .addCase(fetchContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.filteredContent = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContents.rejected, (state) => {
        state.filteredContent = {};
        state.isLoading = false;
      })

      //fetch content by id
      .addCase(fetchContentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.currentContent = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContentById.rejected, (state) => {
        state.currentContent = null;
        state.isLoading = false;
      })

      // add new content
      .addCase(addNewContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewContent.fulfilled, (state, action) => {
        state.filteredContent = {
          ...state.filteredContent,
          contents: [...state.filteredContent.contents, action.payload],
        };

        state.isLoading = false;
        toast.success("content added successfully ✅");
      })
      .addCase(addNewContent.rejected, (state) => {
        state.isLoading = false;
      })

      // delete content by id
      .addCase(deleteContentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContentById.fulfilled, (state, action) => {
        const deletedContentId = action.payload.contentId;
        const newContentArr = state.filteredContent.contents.filter(
          (content) => content._id !== deletedContentId
        );
        state.filteredContent = {
          ...state.filteredContent,
          contents: newContentArr,
        };
        toast.success("content deleted successfully ✅");
        state.isLoading = false;
      })
      .addCase(deleteContentById.rejected, (state) => {
        state.allContent = [];
        state.isLoading = false;
      })

      // update toggle: display content to user
      .addCase(ToggleDisplayContentToUser.pending, (state) => {
        state.isDisplayToggleLoading = true;
      })
      .addCase(ToggleDisplayContentToUser.fulfilled, (state, action) => {
        const updatedArr = state.filteredContent.contents.map((content) =>
          content._id === action.payload._id ? action.payload : content
        );
        state.filteredContent = {
          ...state.filteredContent,
          contents: updatedArr,
        };
        state.isDisplayToggleLoading = false;
      })
      .addCase(ToggleDisplayContentToUser.rejected, (state) => {
        state.isDisplayToggleLoading = false;
      })

      // update content by id for details
      .addCase(updateContentDetailsById.pending, (state) => {
        state.isDetailsUploading = true;
      })
      .addCase(updateContentDetailsById.fulfilled, (state, action) => {
        toast.success("content details updated successfully ✅");
        const updatedContent = action.payload;
        state.currentContent = updatedContent;
        const newContentArr = state.filteredContent.contents.map((content) =>
          content._id === updatedContent._id ? updatedContent : content
        );
        state.filteredContent = {
          ...state.filteredContent,
          contents: newContentArr,
        };
        state.isDetailsUploading = false;
      })
      .addCase(updateContentDetailsById.rejected, (state) => {
        state.isDetailsUploading = false;
      })

      // update content thumbnail by id
      .addCase(updateContentThumbnailById.pending, (state) => {
        state.isThumbnailUploading = true;
      })
      .addCase(updateContentThumbnailById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        state.currentContent = updatedContent;
        const newContentArr = state.filteredContent.contents.map((content) =>
          content._id === updatedContent._id ? updatedContent : content
        );
        state.filteredContent = {
          ...state.filteredContent,
          contents: newContentArr,
        };
        toast.success("content thumbnail updated successfully ✅");
        state.isThumbnailUploading = false;
      })
      .addCase(updateContentThumbnailById.rejected, (state) => {
        state.isThumbnailUploading = false;
      })

      // update content video by id
      .addCase(updateContentVideoById.pending, (state) => {
        state.isContentUploading = true;
      })
      .addCase(updateContentVideoById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        state.currentContent = updatedContent;
        const newContentArr = state.filteredContent.contents.map((content) =>
          content._id === updatedContent._id ? updatedContent : content
        );
        state.filteredContent = {
          ...state.filteredContent,
          contents: newContentArr,
        };
        toast.success("content video updated successfully ✅");
        state.isContentUploading = false;
      })
      .addCase(updateContentVideoById.rejected, (state) => {
        state.isContentUploading = false;
      })

      // update content trailer by id
      .addCase(updateContentTrailerById.pending, (state) => {
        state.isTrailerUploading = true;
      })
      .addCase(updateContentTrailerById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        state.currentContent = updatedContent;
        const newContentArr = state.filteredContent.contents.map((content) =>
          content._id === updatedContent._id ? updatedContent : content
        );
        state.filteredContent = {
          ...state.filteredContent,
          contents: newContentArr,
        };
        toast.success("content trailer updated successfully ✅");
        state.isTrailerUploading = false;
      })
      .addCase(updateContentTrailerById.rejected, (state) => {
        state.isTrailerUploading = false;
      });
  },
});

export default adminManageContentsSlice.reducer;
