import { useNavigate } from "react-router-dom";
import profile from "../../images/profile.jpeg";
import router from "../../config/router.app";

export default function NotificationCard({ item }) {
  const navigate = useNavigate();
console.log(item);

  return (
    <div className="w-full flex gap-3 px-4 py-3 border-b border-gray-200 items-start">

      <img
        src={item?.from?.profileImgUrl || profile}
        alt={item?.from?.fullname || "user"}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1 text-sm">
        <p className="text-gray-900">
          <span className="font-semibold">
            {item?.from?.fullname || "Meetus user"}
          </span>{" "}
          <span className="text-gray-500">
            @{item?.from?.username}
          </span>
        </p>

        {(item?.message || item?.text) && (
          <p className="text-gray-700 mt-1">
            {item?.message || item?.text}
          </p>
        )}

        <div className="flex gap-4 mt-1 text-xs text-blue-600">
          {item?.postId && (
            <p
              onClick={() => navigate(router.postViewLink(item?.postId))}
              className="cursor-pointer hover:underline"
            >
              See post
            </p>
          )}

          {item?.notificationType === "follow-unfollow" && (
            <p
              onClick={() => navigate(`/profile/${item?.from?._id}`)}
              className="cursor-pointer hover:underline"
            >
              Follow to answer
            </p>
          )}

          {item?.message && (
            <p className="cursor-pointer text-gray-500 hover:underline">
              Mark as read
            </p>
          )}
        </div>
      </div>

      {item?.read === false && (
        <span className="w-2.5 h-2.5 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
      )}
    </div>
  );
}
