import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";


const initialState ={
    filteredContent: [],
    currentContent:{},
    isLoading: false,
    isDetailsUploading: false,
    isThumbnailUploading:false,
    isTrailerUploading:false,
    isContentUploading:false,


}






// fetch all content
export const fetchAllContent = createAsyncThunk(
    "content/fetchContent",
    async ({ rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("/contents?contentType=movie");
        console.log(response)
        const data = response.data.data;  
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    }
  );
  
// fetch content by id
export const fetchContentById = createAsyncThunk(
    "content/fetchContentById",
    async ({ contentId }, { rejectWithValue }) => {
      try {
        console.log(contentId,'///gsdfg')
        const response = await axiosInstance.get(`/contents/${contentId}`);
        const data = response.data.data;
        console.log(data,'///fasdfas')
        
  
        return data;
      } catch (error) {
        console.log(error,'/error')
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // fetch content by search text
  export const fetchContentBySearch = createAsyncThunk(
    "content/fetchContentBySearch",
    async ({pageNo, searchText }, { rejectWithValue }) => {
      try {
        const url = searchText ? `/contents?search=${searchText}` :`/contents?page=${pageNo}&limit=5`
        const response = await axiosInstance.get(url);
        console.log(response,'//dsdaf')
        const data = response.data.data;
        console.log(data,'///by search')
    
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  //  add new content 
  export const addNewContent = createAsyncThunk(
    "content/addNewContent",
    async (newContent, { rejectWithValue }) => {
      console.log("reached", newContent);
      try {
        const response = await axiosInstance.post(`/contents`, newContent);
        const data = response.data.data;
  
        return data;
      } catch (error){
      console.log(error)
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  //  update content by id
  export const updateContentDetailsById = createAsyncThunk(
    "content/updateContentDetailsById",
    async ( {id, newData}  , { rejectWithValue, dispatch }) => {

      // console.log("called updar", newData, "//////", id);
      try {
        const response = await axiosInstance.put( `/contents/${id}`, newData);
        const data = response.data.data;
     
        return data;
      } catch (error) {
        console.log(error,'errorrrr//')
        return rejectWithValue(error.response);
      }
    }
  );
    //  update content thumbnail by id
    export const updateContentThumbnailById = createAsyncThunk(
      "content/updateContentThumbnailById",
      async ( {id, newData}  , { rejectWithValue, dispatch }) => {
  
        // console.log("called updar", newData, "//////", id);
        try {
          const response = await axiosInstance.put( `/contents/${id}`, newData);
          const data = response.data.data;
       
          return data;
        } catch (error) {
          console.log(error,'errorrrr//')
          return rejectWithValue(error.response);
        }
      }
    );
  
  //  update content video by id
  export const updateContentVideoById = createAsyncThunk(
    "content/updateContentVideoById",
    async ( {id, newData}  , { rejectWithValue, dispatch }) => {

      console.log("called updar", newData, "//////", id);
      try {
        const response = await axiosInstance.put( `/contents/${id}`, newData);
        const data = response.data.data;
        console.log(data)
        return data;
      } catch (error) {
        console.log(error,'errorrrr//')
        return rejectWithValue(error.response);
      }
    }
  );

   //  update content video by id
   export const updateContentTrailerById = createAsyncThunk(
    "content/updateContentTrailerById",
    async ( {id, newData}  , { rejectWithValue, dispatch }) => {

      console.log("called updar", newData, "//////", id);
      try {
        const response = await axiosInstance.put( `/contents/${id}`, newData);
        const data = response.data.data;
     
        return data;
      } catch (error) {
        console.log(error,'errorrrr//')
        return rejectWithValue(error.response);
      }
    }
  );

  // delete content by id
  export const deleteContentById = createAsyncThunk(
    "content/deleteContentById",
    async (contentId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`/contents/${contentId}`);
        const data = response.data.contentData;
  
        return { data, contentId };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  






export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      //fetch all content
      .addCase(fetchContentBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContentBySearch.fulfilled, (state, action) => {
        state.filteredContent = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContentBySearch.rejected, (state) => {
        state.filteredContent = [];
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
        state.contentLoading = true;
      })
      .addCase(addNewContent.fulfilled, (state, action) => {
        state.allContent = [...state.allContent, action.payload];
        state.contentLoading = false;
      })
      .addCase(addNewContent.rejected, (state) => {
        state.currentContent = null;
        state.contentLoading = false;
      })

      // delete content by id
      .addCase(deleteContentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContentById.fulfilled, (state, action) => {
        const deletedContentId = action.payload.contentId;
        const filteredContent = state.allContent.filter(
          (item) => item._id !== deletedContentId
        );
        state.allContent = filteredContent;
        state.isLoading = false;
      })
      .addCase(deleteContentById.rejected, (state) => {
        state.allContent = [];
        state.isLoading = false;
      })

      // update content by id for details
      .addCase(updateContentDetailsById.pending, (state) => {

        state.isDetailsUploading=true;
      })
      .addCase(updateContentDetailsById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        state.currentContent = updatedContent;

        //have to fix filtered content state

        // state.filteredContent = state.filteredContent.map((content) => (
        //     content._id === updatedContent._id ? updatedContent : content 
        //     )
        //   );

        state.isDetailsUploading = false;
      })
      .addCase(updateContentDetailsById.rejected, (state) => {

        state.isDetailsUploading = false;
      })

      // update content by id for thumbnail
      .addCase(updateContentThumbnailById.pending, (state) => {

        state.isThumbnailUploading=true;
      })
      .addCase(updateContentThumbnailById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        state.currentContent = updatedContent;

        //have to fix filtered content state

        // state.filteredContent = state.filteredContent.map((content) => (
        //     content._id === updatedContent._id ? updatedContent : content 
        //     )
        //   );

        state.isThumbnailUploading = false;
      })
      .addCase(updateContentThumbnailById.rejected, (state) => {

        state.isThumbnailUploading = false;
      })


      // update content video by id 
      .addCase(updateContentVideoById.pending, (state) => {

        state.isContentUploading=true;
      })
      .addCase(updateContentVideoById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        state.currentContent = updatedContent;

        //have to fix filtered content state

        // state.filteredContent = state.filteredContent.map((content) => (
        //     content._id === updatedContent._id ? updatedContent : content 
        //     )
        //   );

        state.isContentUploading = false;
      })
      .addCase(updateContentVideoById.rejected, (state) => {

        state.isContentUploading = false;
      })


       // update content trailer by id 
       .addCase(updateContentTrailerById.pending, (state) => {

        state.isTrailerUploading=true;
      })
      .addCase(updateContentTrailerById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        state.currentContent = updatedContent;

        //have to fix filtered content state

        // state.filteredContent = state.filteredContent.map((content) => (
        //     content._id === updatedContent._id ? updatedContent : content 
        //     )
        //   );

        state.isTrailerUploading = false;
      })
      .addCase(updateContentTrailerById.rejected, (state) => {

        state.isTrailerUploading = false;
      })
    }
    
})




export default adminSlice.reducer;