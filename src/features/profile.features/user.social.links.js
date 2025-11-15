import api from "../../config/axios.api";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { t } from "i18next";


export const add_link=createAsyncThunk(
    'add_privite_web_link/dd_link',
    async({link,name},{rejectWithValue,getState})=>{
        try {
      const response=await api.post('/user/link',{link,name})
      toast.success('Link added successfully')
      return response.data
            
        } catch (error) {
            console.log("Error ocured while adding link ",
               error.status,
               error.message                 
            );
            
            const status=error.status
            if(status===400 || status === 404  || status===500) return rejectWithValue(t('serverError.error'))
            return rejectWithValue(t('serverError.error'))
        }
    }
)


export const rename_link=createAsyncThunk(
    'rename_user_link/rename_link',
    async({link,name},{rejectWithValue,getState})=>{
        try {
            const {user}=getState().user
              let id=user.website.id
            const response=await api.put(`/user/${id}/put_link`,{name,link})
            toast.success('Link successfully updated ')
            return response.data
        } catch (error) {
            console.log("Error ocured while putting link",error.status,error.message)
            const status=error.status

             if(status===400 || status === 404  || status===500) return rejectWithValue(t('serverError.error'))
            return rejectWithValue(t('serverError.error'))

        }
    }
)




