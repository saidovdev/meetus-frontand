import { createSlice } from "@reduxjs/toolkit";


const initialState={
    page:'profile',
    error:''
}

const navigatorSlice=createSlice({
    name:'navigator',
    initialState,
    reducers:{
        changePage:(state,action)=>{
            console.log(action.payload.page);
            
            state.page=action.payload.page
        }
    }
})

export const {changePage} =navigatorSlice.actions
export default navigatorSlice.reducer