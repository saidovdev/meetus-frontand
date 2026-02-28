import { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Bookmark,
  Share2,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MoreMenu from "./MoreMenu.jsx";
import CollaboratorsModal from "./CollaboratorsModal";
import profileImg from "../../../images/profile.jpeg";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import router from "../../../config/router.app.js";

export default function PostCard({ item }) {
  const { user } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.onlineUsers);

  const [openColModal, setOpenColModal] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  const navigate = useNavigate();

  const collaborators = item?.collaborators || [];
  const showPreview = collaborators.slice(0, 2);
  const more = collaborators.length - 2;

  const isOnline = onlineUsers?.some(
    (u) => u === item?.userId?._id || u?.userId === item?.userId?._id
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dotsClass: "slick-dots slick-dots-lg",
  };

  return (
    <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 mb-6 overflow-hidden mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={item?.userId?.profileImgUrl || profileImg}
              className="w-12 h-12 rounded-full border object-cover"
              alt="profile"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-gray-900">
              {item?.userId?.username || "User"}
            </h3>
            <p className="text-xs text-gray-500">{item?.category}</p>

            {collaborators.length > 0 && (
              <div
                className="flex items-center gap-1 mt-1 cursor-pointer"
                onClick={() => setOpenColModal(true)}
              >
                {showPreview.map(
                  (c, i) =>
                    c.accepted && (
                      <img
                        key={i}
                        src={c?.userId?.profileImgUrl || profileImg}
                        className="w-6 h-6 rounded-full border object-cover"
                        alt="collaborator"
                      />
                    )
                )}

                {more > 0 && (
                  <span className="text-[11px] px-2 py-[1px] bg-gray-200 rounded-full text-gray-700">
                    +{more} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
  <MoreMenu
    onEdit={() => console.log("Edit clicked")}
    onDelete={() => console.log("Delete clicked")}
    onSpam={() => console.log("Spam clicked")}
    onShare={() => console.log("Share clicked")}
    postOwnerId={item?.userId}
  />
      </div>

      {item?.images?.length > 0 && (
        <div className="w-full h-[300px] relative bg-gray-50">
          <Slider {...sliderSettings}>
            {item.images.map((img, index) => (
              <div key={index} className="w-full h-[300px]">
                <img
                  src={img.imageUrl}
                  alt={`post-image-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {item?.images?.length === 0 && item?.videoUrl && (
        <div className="w-full h-[300px] overflow-hidden bg-black relative cursor-pointer">
          {!playVideo ? (
            <>
              <video
                src={item.videoUrl}
                className="w-full h-full object-cover opacity-90"
                muted
                playsInline
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => setPlayVideo(true)}
              >
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-black text-2xl font-bold">
                  ►
                </div>
              </div>
            </>
          ) : (
            <video
              src={item.videoUrl}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          )}
        </div>
      )}

      {item?.title && (
        <h2 className="px-4 pt-3 text-lg font-bold text-gray-900 line-clamp-2">
          {item.title}
        </h2>
      )}

      {item?.shortDescription && (
        <p className="px-4 pt-1 text-[14px] text-gray-800 line-clamp-3">
          {item.shortDescription}
        </p>
      )}

      <div className="px-4 py-2 flex justify-between items-center text-gray-700">
        <div className="flex gap-4">
          <Heart size={22} className="cursor-pointer hover:text-red-500" />

          <MessageCircle
            size={22}
            className="cursor-pointer hover:text-blue-500"
            onClick={() => navigate(router.postViewLink(item?._id))}
          />

          <Share2
            size={22}
            className="cursor-pointer hover:text-blue-500"
          />
        </div>

        <Bookmark
          size={22}
          className="cursor-pointer hover:text-black"
        />
      </div>

      {item?.fullDescription && (
        <div className="px-4 pb-2 text-[14px] text-gray-800 max-h-[120px] overflow-y-auto">
          {item.fullDescription}
        </div>
      )}

      {(item.github || item.link || item.live) && (
        <div className="px-4 pb-3 flex gap-3 flex-wrap">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
            >
              GitHub
            </a>
          )}

          {(item.link || item.live) && (
            <a
              href={item.link || item.live}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
            >
              Link
            </a>
          )}
        </div>
      )}

      <CollaboratorsModal
        open={openColModal}
        onClose={() => setOpenColModal(false)}
        item={item}
        user={user}
        collaborators={collaborators}
      />
    </div>
  );
}
