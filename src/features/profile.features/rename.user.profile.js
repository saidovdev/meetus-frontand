import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import toast from "react-hot-toast";
import { t } from "i18next";



export const upload_images=createAsyncThunk(
    'rename_user_info/rename_user.profile',
    async({file},{rejectWithValue})=>{
        try {
             const formData=new FormData()
              formData.append('image',file)
              const response = await api.post('/profile/add_profile_img', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
              });
              toast.success(t('profile.profileImgUpload'));
             return response.data.user;
                 } catch (error) {
                  toast.error(t('serverError.error'));
                return rejectWithValue(t('serverError.error'))
        }
    }
)


export const delete_profile_image=createAsyncThunk(
    'delete_profile_image/delete',
    async(__,{rejectWithValue,getState})=>{
        try {
            const {user}=getState().user
            
            const response=await api.post('/profile/delete/img',{profileImgPublicId:user.profileImgPublicId})

            toast.success(t('profile.deletedProfileImg'))
            
            return response.data
        } catch (error) {
            console.log(
                "Error ocured while deleting profile iimage",
                error.status,
                error.message
            )

                 toast.error(t('serverError.error'))
                return rejectWithValue(t('serverError.error'))
        }
    }
)




