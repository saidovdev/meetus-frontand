import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import { t } from "i18next";
import toast from "react-hot-toast";
export const signup=createAsyncThunk(
    'signup/signupUser',
    async({email,password,username},{rejectWithValue})=>{
     try {
         const response=await api.post('/verify-request',{email,username})
      if(response.data.status===409){
        return  rejectWithValue(response.data.warning)
      }else if(response.data.status===500){
        toast.error(t('serverError.error'))
        return rejectWithValue(response.data)
      }
        return {email,password,username}
     } catch (error) {
        toast.error(t('serverError.error'))
 return rejectWithValue(error.message)

    }
    }
)




const initialState={
    userType:'',
    email:'',
    username:'',
    password:'',
    reportError:'',
    pending:false,
    success:false
}


const userSignupSlice=createSlice({
    name:'signupUser',
    initialState,
    reducers:{
        selectType:(state,action)=>{
            state.userType=action.payload.type

        },
        removeAllSignUpExtraData:(state)=>{
            state.userType='';
            state.email='';
            state.username='';
            state.password='';
            state.pending=false;
            state.reportError=''
        }
    },
    extraReducers:(builder)=>{
        builder
   .addCase(signup.fulfilled,(state,action)=>{
    state.email = action.payload.email;
    state.username = action.payload.username;
    state.password = action.payload.password;
    state.pending = false;
    state.reportError = '';
    state.success=true
})

        .addCase(signup.pending,(state,action)=>{
            state.pending=true
            state.reportError=''
            state.success=false
        })
        .addCase(signup.rejected,(state,action)=>{
         state.pending=false,
          state.reportError=action.payload
          state.success=false
        })
    }

})

export const {selectType,removeAllSignUpExtraData}=userSignupSlice.actions
export default userSignupSlice.reducer