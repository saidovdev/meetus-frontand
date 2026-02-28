import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from '../../config/axios.api.js'
import { t } from "i18next";
import toast from "react-hot-toast";





const initialState={
     postId:'',
     images:[],
      video:'',
     videoId:'',
     title:''  ,
     shortDescription:'',
     fullDescription:'',
     category:'',
     tags:[],
     collaborators:[],
     youtube:'',
     live:'',
     github:'',
     link:''
}

const updatePostSlice=createSlice({
    name:'updatePost',
    initialState,
    reducers:{
        setInitialState:(state,action)=>{
            state.postId=action.payload.postId
            state.images=action.payload.images
            state.video=action.payload.video
            state.videoId=action.payload.videoId
            state.collaborators=action.payload.collaborators
            state.title=action.payload.title
            state.category=action.payload.title
            state.youtube=action.payload.youtube
            state.fullDescription=action.payload.fullDescription
            state.shortDescription=action.payload.shortDescription
            state.link=action.payload.link
            state.live=action.payload.live
            state.github=action.payload.github
            state.tags=action.payload.tags
        },
        updateFields:(state,action)=>{
            if(state[action.payload.key]=action.payload.key){
                state[action.payload.key]=action.payload.value
            }
        }

    }
})

export const {setInitialState,updateFields} =updatePostSlice.actions

export default updatePostSlice.reducer





