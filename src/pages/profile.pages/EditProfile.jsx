import React, { useState ,useRef} from "react";
import { useSelector,useDispatch } from "react-redux";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/profile-components/Modal";
import backgroundImage from "../../images/meetus_background.png";
import profileImage from "../../images/profile.jpeg";
import businessImage from "../../images/bussness.png";
import { ArrowRight, Check, Pencil, Trash, } from "lucide-react";
import { upload_profile_cover_img,delete_cover_image } from "../../features/profile.features/rename.user.profile";
import { changePage } from "../../features/navigator.features/navigator";
export default function EditProfilePage() {
  const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
  const [selectedFile,setSelectedFile]=useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const fileInputRef=useRef(null)
  const fields = [
    { label: t("profile.fullName") || "Full Name", value: user?.fullname || "" , navigateTo:'renamefullname'},
    { label: t("profile.username") || "Username", value: user?.username || "" ,navigateTo:'renameusername'},
    { label: t('profile.email'), value: user?.email || "",navigateTo:'renameemail' },
    { label: t('profile.location'), value: user?.location || "" ,navigateTo:'renamelocation'},
    {label:t('profile.bio'),value:user?.bio || "",navigateTo:'renamebio'},
    {label:t('profile.birthdate'),value:user?.birthdate || "",navigateTo:'renamebirthdate'}
  ];
 
  const canDelete = user.coverImgUrl?.startsWith("https");
  const handleUploadClick = () => fileInputRef.current.click();
  const handleFileChange=(e)=>{
   const file = e.target.files[0];
    if (file) setSelectedFile(file);
  }

    const handleDispatchUpload = () => {
    if (!selectedFile) {
       toast.error(t('profile.pleaseSelectImg'));
    return;
    }

  
  if (!selectedFile.type.startsWith("image/")) {
       toast.error(t('profile.pleaseSelectImg'));
    setSelectedFile(null);
    return;
  }

  dispatch(upload_profile_cover_img({ file: selectedFile }));
  setSelectedFile(null); 
};



  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex items-center px-4 py-3 bg-white shadow-md">
        <button
          className="mr-3 text-gray-600 hover:text-blue-500 transition"
          onClick={()=>dispatch(changePage({page:'profile'}))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{t("profile.editProfile") || "Edit Profile"}</h1>
      </div>

      <div className="relative w-full">
        <div className="relative h-[14rem] md:h-[16rem] w-full">
          <img
            src={ selectedFile ? URL.createObjectURL(selectedFile):user?.coverImgUrl || backgroundImage}
            alt="cover"
            className="h-full w-full object-cover rounded-b-2xl shadow-sm"
          />

    {selectedFile ? (
  <button 
    className="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shadow-md hover:bg-white transition"
    onClick={handleDispatchUpload}
  >
    <Check size={18} className="text-gray-700" />
  </button>
) : (
  <>
    <button 
      className="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shadow-md hover:bg-white transition"
      onClick={handleUploadClick}
    >
      <Pencil size={18} className="text-gray-700" />
    </button>

    {canDelete && (
      <button 
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shadow-md hover:bg-white transition"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete cover image?")) {
            dispatch(delete_cover_image({ userId: user._id }));
          }
        }}
      >
        <Trash size={18} className="text-gray-700" />
      </button>
    )}
  </>
)}

        </div>

         <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        <div className="absolute left-4 sm:left-8 -bottom-12 flex items-center gap-4">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-white shadow-lg overflow-hidden cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={user?.profileImgUrl || profileImage}
              alt="profile"
              className="object-cover w-full h-full"
            />
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            imageUrl={user?.profileImgUrl || profileImage}
            userId={user?._id}
          />
        </div>
      </div>

      <div className="mt-20 px-5 sm:px-8 flex flex-col gap-4">
        {fields.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white shadow-sm rounded-2xl px-4 py-3 flex justify-between items-center border border-gray-200 hover:border-blue-400 transition cursor-pointer"
            onClick={()=>dispatch(changePage({page:item.navigateTo}))} >
            <div>
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-base text-gray-800 font-medium">{item.value || t('profile.add')}</p>
            </div>
            <div className="text-gray-400 hover:text-blue-500 transition">
              <Pencil size={18} />
            </div>
          </div>
        ))}



      </div>
      <div className="flex items-center justify-between w-full bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 cursor-pointer" >
  <p className="text-gray-700 font-medium text-sm sm:text-base break-words">
    Add social links
  </p>

  <ArrowRight size={18} className="text-gray-400" onClick={()=>dispatch(changePage({page:'addsocialLink'}))} />
</div>

      <div className="pb-28 sm:pb-6"></div>
    </div>
  );
}
