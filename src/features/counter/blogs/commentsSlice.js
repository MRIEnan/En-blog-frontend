import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: []
}


export const getAllComments = createAsyncThunk(
    'comment/blogId',
    async (blogId) =>{
        //console.log(blogId)
        const response = await fetch(`http://localhost:5000/comment/${blogId}`)
        .then(res => res.json())
        .catch(error => {})
        return response
    }
)
export const postNewComment = createAsyncThunk(
    'newComment',
    async(newComment) => {
        //console.log(newComment);
        const response = await fetch(`http://localhost:5000/newComment`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body: JSON.stringify(newComment)
        }).then(res => res.json())
        .then(data => data)
        .catch(error => {})
        return response;
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllComments.fulfilled, (state,action) =>{
            state.comments = [...action.payload.result]
        })
    }
})

export const {  } = commentsSlice.actions;

export default commentsSlice.reducer;