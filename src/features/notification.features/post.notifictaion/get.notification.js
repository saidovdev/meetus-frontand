import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../../config/axios.api";
import { t } from "i18next";

export const get_unreadNotification=createAsyncThunk(
    'getUnreadNotification/notification',
    async(_,{rejectWithValue})=>{
        try {
            
            const response= await api.get('/notification/get_unread')
            return response.data
        } catch (error) {
         return rejectWithValue(t('serverError.error'))     
        }

    }
)

export const get_allNotification=createAsyncThunk(
    'getAllNotification/notification',
    async(_,{rejectWithValue})=>{
        try {
            const response= await api.get('/notification/get_all')
            return response.data
        } catch (error) {
         return rejectWithValue(t('serverError.error'))     
        }

    }
)

export const update_allUnreadNotification=createAsyncThunk(    
    'update_unreadNotifcation/notification',
    async(_,{rejectWithValue,getState})=>{
      try {
    const {unread}=getState().notification
    if(unread.length===0) return

    const notificationIds=unread.map((item)=>item._id)
    console.log(notificationIds);
    
    const response=await api.put('/notification/update_unread',{notificationIds})
    return response.data
    } catch (error) {
return rejectWithValue(t('serverError.error'))
    }

    }
)

const initialState={
    loading:false,
    reportError:'',
    countUnread:0,
    count:0,
    success:false,
    unread:[],
    all:[]
}

const getNotificationSlice=createSlice({
    name:'get_notification',
    initialState,
    reducers:{
        setAddToUnreadNotification:(state,action)=>{
            state.unread=[...state.unread,action.payload.notification]
            state.countUnread+=1
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(get_unreadNotification.pending,(state,action)=>{
            state.loading=true
            state.unread=[]
            state.success=false
            state.reportError=''
        })
        .addCase(get_unreadNotification.fulfilled,(state,action)=>{
            state.loading=false
            state.unread=action.payload.notification
            state.countUnread=action.payload.count
            state.success=true
            state.reportError=''
        })
      .addCase(get_unreadNotification.rejected,(state,action)=>{
            state.loading=false
            state.unread=[]
            state.countUnread=0
            state.success=false
            state.reportError=action.payload
        })
               .addCase(get_allNotification.pending,(state,action)=>{
            state.loading=true
            state.unread=[]
            state.countUnread=0
            state.success=false
            state.reportError=''
        }) 
         .addCase(get_allNotification.fulfilled,(state,action)=>{
            state.loading=false
            state.unread=[]
            state.countUnread=0
            state.success=true
            state.reportError=''
            state.all=action.payload.notification
            state.count=action.payload.count
        })         .addCase(get_allNotification.rejected,(state,action)=>{
            state.loading=false
            state.unread=[]
            state.countUnread=0
            state.success=false
            state.all=[]
            state.count=0
            state.reportError=action.payload
        }) 

    }
})

export const {setAddToUnreadNotification} =getNotificationSlice.actions
export default  getNotificationSlice.reducer
