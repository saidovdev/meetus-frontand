import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotificationPost = ({
  avatar,
  fullname,
  username,
  text,
  postId,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-3 w-[360px] px-4 py-3 rounded-[20px]
                 bg-white/80 backdrop-blur-xl
                 shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                 border border-black/5"
    >
      <img
        src={avatar}
        alt={fullname}
        className="w-11 h-11 rounded-full object-cover"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {fullname}
          </p>
          <span className="text-xs text-gray-500 truncate">
            @{username}
          </span>
        </div>

        <p className="text-sm text-gray-700 mt-[2px] leading-snug line-clamp-2">
          {text}
        </p>

        <button
          onClick={() => navigate(`/post/${postId}`)}
          className="mt-2 flex items-center gap-1 text-[13px]
                     text-blue-500 hover:text-blue-600 transition"
        >
          See the post
          <ChevronRight size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
