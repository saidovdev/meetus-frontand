 import { useDispatch,useSelector } from "react-redux";
 import { useNavigate } from "react-router-dom";
 import { useEffect, useState } from "react";
 import router from '../../config/router.app.js'
 import { t } from "i18next";
import { setInitialState,updateFields } from "../../features/post.feautures/update.post.js";
import { get_post } from "../../features/post.feautures/get.post.js";

 export default function UpdatePost(){ 
  const dispatch=useDispatch()
   const navigate=useNavigate()

   useEffect(()=>{
    dispatch(get_post({postId}))
   },[])
    return (
        <h1>   
            h1
        </h1>
    )
 }