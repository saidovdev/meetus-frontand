import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import toast from "react-hot-toast";
import { t } from "i18next";




export const rename_user_info=createAsyncThunk(
    'rename_user_info/rename_user.profile',
    async({key,value},{})=>{
        try {
            const response=await api.post('/profile/edit',{[key]:value})
            to
        } catch (error) {
            
        }
    }
)
