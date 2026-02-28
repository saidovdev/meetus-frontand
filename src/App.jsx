import { useState } from 'react'
import './App.css'
import { Routes ,Route} from 'react-router-dom'
import Introduction from './pages/auth.pages/Introduction.jsx'
import router from './config/router.app.js'
import './config/i18n.js'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { checkUserAuth } from './features/auth.features/check.auth.js'
import { useDispatch, useSelector } from 'react-redux'
import SelectUserType from './pages/auth.pages/SelectUserType.jsx'
import SignUp from './pages/auth.pages/SignUp.jsx'
import Verify_Code from './pages/auth.pages/Verify_Code.jsx'
import Login from './pages/auth.pages/Login.jsx'
import ForgotPassword from './pages/auth.pages/ForgotPassword.jsx'
import Verify_Forgot from './pages/auth.pages/Verify_Forgot.jsx'
import ChangePassword from './pages/auth.pages/ChangePassword.jsx'
import CompleteProfile from './pages/auth.pages/CompleteProfile.jsx'
import Company from './pages/company.pages/Company.jsx'
import History from './pages/history.pages/History.jsx'
import Chats from './pages/messages.pages/Chats.jsx'
import Posts from './pages/posts.pages/Posts.jsx'
import ProfileMain from './pages/profile.pages/ProfileMain.jsx'
import Jobs from './pages/jobs.pages/Jobs.jsx'
import StuckNavigatorPage from './pages/profile.pages/StuckNavigatorPage.jsx'
import Collaborators from './pages/posts.pages/Collaborators.jsx'
import AddLinksForPost from './components/post-components/Tools/AddLinksForPost.jsx'
import AddCategoryForPostComponent from './components/post-components/Tools/AddCategoryForPost.jsx'
import { useNavigate } from 'react-router-dom'
import NotificationCard from './units/Notication/NotificationBox.jsx'
import PostViewPage from './pages/posts.pages/PostViewPage.jsx'
import { socket } from './config/socket.io.js'
import { setOnlineUsers } from './features/notification.features/post.notifictaion/online.user.js'
import { Toaster as SonnerToaster } from 'sonner'
import NotificationBox from './components/notification/NoticiationBox/NotificationBox.jsx'
import UpdatePost from './pages/posts.pages/UpdatePost.jsx'
function App() {
  const userData=useSelector(state=>state.user)
const onlineData =useSelector(state=>state.onlineUsers)

  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
  socket.on("connect", () => {
    console.log("socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log(" socket error:", err.message);
  });
}, []);


    useEffect(()=>{


     dispatch(checkUserAuth())
   },[dispatch])

useEffect(()=>{
  if(userData?.user?._id){
    socket.emit("user-online", userData.user._id);
  }
},[userData?.user?._id]);



useEffect(()=>{
  socket.on("online-users",(userIds)=>{
    dispatch(setOnlineUsers(userIds))
  })

  return ()=>{
    socket.off('online-users')
  }
},[])

  //        useEffect(() => {
  //   if (!userData?.loading) {
  //     if (userData.user?.email) {
  //       navigate(router.stuckNavigator, { replace: true });
  //     }

  //   }
  // }, [userData?.loading, userData.user?.email, navigate]);
  
  return (  
    <>
    <Toaster position='top-rigth' reverseOrder={false} />
      <SonnerToaster
        position="top-center"
        expand
        richColors
        closeButton
       />
      <Routes>
        <Route path={router.intro} element={<Introduction/>}/>
        <Route path={router.selectType} element={<SelectUserType/>} />
        <Route path={router.signup} element={<SignUp/>} />
        <Route path={router.verfiycode} element={<Verify_Code/>} />
        <Route path={router.login} element={<Login/>}/>
        <Route path={router.verify_forgot} element={<Verify_Forgot/>}/>
        <Route path={router.change_password} element={<ChangePassword/>}/>
        <Route path={router.forgot_password} element={<ForgotPassword/>}/>
        <Route path={router.complete_profile} element={<CompleteProfile/>}/>

        // navigator pages pages 
        <Route path={router.stuckNavigator} element={<StuckNavigatorPage/>}/>
        <Route path={router.myProfile} element={<ProfileMain/>}/>
        <Route path={router.companies} element={<Company/>}/>
        <Route path={router.jobs} element={<Jobs/>}/>
        <Route path={router.history} element={<History/>}/>
        <Route path={router.messages} element={<Chats/>}/>
        <Route  path={router.collaborator} element={<Collaborators/>}/>
        <Route  path={router.addpostlink} element={<AddLinksForPost/>}/>
        <Route  path={router.addcategorypost} element={<AddCategoryForPostComponent/>}/>
        <Route path={router.postView} element={<PostViewPage/>} />
        <Route path={router.notification} element={<NotificationBox/>}/>
        <Route path={router.updatePost} element={<UpdatePost/>}/>









      </Routes>
    </>
  )
}

export default App
