import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../../images/meetus_background.png";
import profileImage from "../../images/profile.jpeg";
import businessImage from "../../images/bussness.png";
import { t } from "i18next";
import Modal from "./Modal";
import { useState } from "react";
import { getCollaborator } from "../../features/notification.features/post.notifictaion/collaborator.notication.js";
import CollaboratorNotification from "../notification/Tools/CollaboratorNotification.jsx";
import { socket } from "../../config/socket.io.js";
import toast from "react-hot-toast";
import { showNotification } from "../../units/Notication/ShowNotification.jsx";
import { Heart } from "lucide-react";
import { get_unreadNotification,setAddToUnreadNotification } from "../../features/notification.features/post.notifictaion/get.notification.js";
import { useNavigate } from "react-router-dom";
import router from "../../config/router.app.js";
export default function ProfileHeader() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { user } = useSelector((state) => state.user);
  const {collaborators} =useSelector(state=>state.collaborator)
  const {onlineUsers}=useSelector(state=>state.onlineUsers)
  const {unread,countUnread} =useSelector(state=>state.notification)
const [isModalOpen,setIsModalOpen]=useState(false)

useEffect(()=>{
  dispatch(get_unreadNotification())
},[])



  const isOnline = onlineUsers?.includes(user?._id)





useEffect(()=>{
  dispatch(getCollaborator())
socket.on("notification", (data) => {
  const n = data.notification;  

  console.log("REAL TIME ACCEPT:", n);

  dispatch(setAddToUnreadNotification(n));

  showNotification({
    avatar: n?.from?.profileImgUrl || profileImage,
    fullname: n?.from?.fullname || "",
    username: n?.from?.username || "",
    message: "",
    text: n?.text || "",
    notificationType: n?.notificationType,
    senderId: n?.from?._id,
    postId: n?.postId || "",
  });
});
},[])

  return (
    <div className="relative w-full ">
      {collaborators?.length>0 && 
      collaborators?.map((item)=>(
   <div key={item?._id}> 
       <CollaboratorNotification  collaborator={item} /></div>
      ))
      
      }

<div className="relative h-[14rem] md:h-[16rem] w-full overflow-hidden rounded-b-2xl">

  <img
    src={user?.coverImgUrl ? user.coverImgUrl : backgroundImage}
    alt="cover"
    className="h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

  {user?.role === "business" && (
    <button
      className="absolute top-4 right-4 w-14 h-14 rounded-full
                 bg-white/90 backdrop-blur-md
                 shadow-lg ring-1 ring-black/5
                 flex items-center justify-center
                 active:scale-95 transition"
    >
      <img
        src={businessImage}
        alt="business"
        className="w-8 h-8 object-contain"
      />
    </button>
  )}

<div className="absolute bottom-4 right-4 z-20">
  <button
  onClick={()=>navigate(router.notification)}
    type="button"
    aria-label="Notifications"
    className="
      relative
      w-11 h-11
      rounded-full
      bg-white/90 backdrop-blur-md
      shadow-md
      ring-1 ring-black/5
      flex items-center justify-center
      transition
      hover:bg-white
      active:scale-95
      focus:outline-none
      focus:ring-2 focus:ring-blue-500/40
    "
  >
    <Heart
      size={20}
      strokeWidth={1.8}
      className="text-gray-700"
    />

    {countUnread > 0 && (
      <span
        className="
          absolute -top-1 -right-1
          min-w-[18px] h-[18px]
          px-1
          rounded-full
          bg-red-500
          text-white
          text-[11px]
          font-semibold
          flex items-center justify-center
          shadow
          leading-none
        "
      >
        {countUnread > 99 ? "99+" : countUnread}
      </span>
    )}
  </button>
</div>

</div>

      <div className="absolute left-4 sm:left-8 -bottom-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative">
       <div className="relative w-24 h-24 sm:w-28 sm:h-28 -mt-10 sm:-mt-12">
  <img
    src={user?.profileImgUrl || profileImage}
    alt="profile"
    className="object-cover w-full h-full rounded-full ring-4 ring-white shadow-lg"
    onClick={() => setIsModalOpen(true)}
  />

  {isOnline && (
    <span className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full ring-2 ring-white" />
  )}
</div>

        </div>

<Modal
    isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={user?.profileImgUrl ? user?.profileImgUrl : profileImage}
        userId={user?._id}
/>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-5">
            <h3 className="text-2xl font-semibold text-gray-800">
              {user?.fullname || "Full Name"} <br />
                 <p className="text-gray-500 text-lg mt-1">
            @{user?.username || "username"}
          </p>

            </h3>

            <div className="flex items-center gap-6 text-gray-700 text-sm">
              <div className="flex flex-col text-center">
                <p className="text-gray-500">{t('profile.followers')}</p>
                <p className="font-semibold">{user?.followers?.length || 0}</p>
              </div>

              <div className="flex flex-col text-center">
                <p className="text-gray-500">{t('profile.following')}</p>
                <p className="font-semibold">{user?.following?.length || 0}</p>
              </div>

              <div className="flex flex-col text-center">
                <p className="text-gray-500">{user?.role==="business" ? t('profile.vacancy'):t('profile.projects')}</p>
                <p className="font-semibold">{user?.posts?.length || 0}</p>
              </div>
            </div>
          </div>

       
        </div>
      </div>

      <div className="pb-28 sm:pb-6"></div>
    </div>
  );
}
