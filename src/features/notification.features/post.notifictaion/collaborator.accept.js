import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../../config/axios.api.js";
import { t } from "i18next";

import toast from "react-hot-toast";

export const accept_post=createAsyncThunk(
    'accept_collaborator/collaborator',
    async({id,postId},{rejectWithValue})=>{
        console.log("userId",id,"postId",postId);
        
        try {
            const response=await api.post(`/collaborators/accept_post/${id}/${postId}`)
            return response.data
        } catch (error) {
            toast.error(t('serverError.error'))
            return rejectWithValue(t('serverError.error'))
        }
    }
)



const initialState={
    success:false,
    reportError:"",
    loading:false
}


const collaboratorSlice=createSlice({
    name:'collaborator',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(accept_post.pending,(state,action)=>{
            state.loading=true
            state.reportError=''
            state.success=false
        })
          .addCase(accept_post.fulfilled,(state,action)=>{
            state.loading=false
            state.reportError=''
            state.success=true
        })  .addCase(accept_post.rejected,(state,action)=>{
            state.loading=false
            state.reportError=action.payload
            state.success=false
        })
    }
})

export default collaboratorSlice.reducer