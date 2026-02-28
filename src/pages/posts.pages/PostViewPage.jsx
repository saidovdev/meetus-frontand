import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useDispatch,useSelector } from "react-redux";
import { ArrowLeft, Heart, MessageCircle, Share2, Github, LogIn } from "lucide-react";

import { get_post } from "../../features/post.feautures/get.post.js";
import { PostSkeleton } from "../../components/post-components/Tools/PostSkeleton.jsx";
import profileImg from '../../images/profile.jpeg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
export default function PostViewPage() {
  
const {postId} =useParams()

    const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dotsClass: "slick-dots slick-dots-lg",
  };

    const navigate=useNavigate()

    const {post,loading,reportError,success} =useSelector(state=>state.getpost)

    const dispacth=useDispatch()
    useEffect(()=>{

      
      dispacth(get_post({postId}))
    },[])
if(loading){
  return <PostSkeleton/>
}

if(reportError!==""){
  <>
  
  <h1>
    Something went wrong please try again !
  </h1>
  </>
}

return (

    <div className="min-h-screen w-screen bg-base-200 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-sm">
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
          <div className="flex items-center gap-3 p-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-3 flex-1">
              <img
                src={post?.userId?.profileImgUrl || profileImg}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="leading-tight">
                <h4 className="font-semibold text-sm">
                  {post?.userId?.fullname || post?.userId?.username}
                </h4>
                <p className="text-xs text-gray-500">
                  @{post?.userId?.username}
                </p>
              </div>
            </div>

            <button className="px-4 py-1.5 text-sm rounded-full bg-primary text-white hover:opacity-90">
              Follow
            </button>
          </div>
        </div>

        {post?.images?.length > 0 && (
          <div className="w-full h-[45vh] sm:h-[55vh] bg-gray-100">
            <Slider {...sliderSettings}>
              {post.images.map((img, index) => (
                <div key={index} className="w-full h-full">
                  <img
                    src={img.imageUrl}
                    className="w-[420px] h-[400px] object-cover"
                  />
                </div>
              ))}
            </Slider>
              <style>
      {`
        .slick-dots {
          bottom: 8px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #60a5fa;
        }
        .slick-dots li.slick-active button:before {
          color: #2563eb;
        }
      `}
    </style>
          </div>
        )}

        {post?.videoUrl && (
          <div className="w-full h-[45vh] sm:h-[55vh] bg-black">
            <video
              src={post.videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-around py-3 border-b text-gray-600">
          <button className="flex items-center gap-2 hover:text-red-500 transition">
            <Heart size={20} />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-500 transition">
            <MessageCircle size={20} />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center gap-2 hover:text-green-500 transition">
            <Share2 size={20} />
            <span className="text-sm">Share</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {post?.title && (
            <h2 className="text-xl font-semibold text-gray-900">
              {post.title}
            </h2>
          )}

          {post?.shortDescription && (
            <p className="text-sm text-gray-700">
              {post.shortDescription}
            </p>
          )}

          {post?.fullDescription && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {post?.fullDescription}
            </p>
          )}

          {post?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {post?.github && (
            <a
              href={post.github}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Github size={16} />
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>


        )

}
