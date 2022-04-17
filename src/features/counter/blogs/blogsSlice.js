import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:0,
    blogs: [],
    totalPage:0,
    currentPage:1,
    singleBlog: {}
}

/* export const blogsSLice  = createSlice({
    name: 'blogs',
    initialState,
    reducers:{
        getAllBlogs: (state) =>{
            createAsyncThunk('post/fetchPosts',async()=>{
                const response = await get('https://localhost:5000/blogs')
                return response.data
            })
        }
    }
}) */


export const getAllBlogs = createAsyncThunk(
    'blogApp/blogs',
    async (pageNo) =>{
        //console.log(pageNo)
        const limit=5;
        const response = await fetch(`https://obscure-river-16853.herokuapp.com/allBlogs?page=${pageNo}&limit=${limit}`)
        .then(res => res.json())
        .catch(error => {})
        return response
    }
)
export const postNewBlog = createAsyncThunk(
    'newBlog',
    async(newPost) => {
        //console.log(newPost);
        const response = await fetch(`https://obscure-river-16853.herokuapp.com/newBlog`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body: JSON.stringify(newPost)
        }).then(res => res.json())
        .then(data => data)
        .catch(error => {})
        return response;
    }
)
export const getSingleBlog = createAsyncThunk(
    'blogApp/blog/id',
    async (id) =>{
        const response = await fetch(`https://obscure-river-16853.herokuapp.com/blog/${id}`)
        .then(res => res.json())
        .catch(error => {})
        return response
    }
)

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers:{
        setCurrentPageNo: (state,action) =>{
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllBlogs.fulfilled, (state,action) =>{
            state.blogs = [...action.payload.result]
            state.totalPage = action.payload.totalBlogs.totalPage
        })
        builder.addCase(getSingleBlog.fulfilled,(state,action)=>{
            state.singleBlog = {...action.payload}
        })
    }
})

export const { setCurrentPageNo } = blogsSlice.actions;

export default blogsSlice.reducer;