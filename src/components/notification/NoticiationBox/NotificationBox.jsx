import { ArrowLeft, Bell, Inbox } from "lucide-react";
import NotificationCard from "../../../units/Notication/NotificationBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { get_allNotification, update_allUnreadNotification } from "../../../features/notification.features/post.notifictaion/get.notification";

export default function NotificationBox() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const notification = useSelector((state) => state.notification);
useEffect(()=>{
dispatch(update_allUnreadNotification())
dispatch(get_allNotification())
},[])
const notices=[...notification?.all,...notification?.unread]

  const noticesCount = notices.length || 0;
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 relative">

      <div className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft
              onClick={() => navigate(-1)}
              className="cursor-pointer text-gray-700"
              size={22}
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Bell size={18} /> Notifications
              </h2>
              <p className="text-xs text-gray-500">
                You have {notification?.unread?.length} unread notifications
              </p>
            </div>
          </div>

          { notification?.unread?.length> 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {notification?.unread?.length}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3 pb-24">
        {noticesCount > 0 ? (
          notices.map((item) => (
            <NotificationCard key={item._id} item={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-24 text-gray-400">
            <Inbox size={60} className="mb-4" />
            <p className="text-sm font-medium">No new notifications</p>
            <p className="text-xs">You're all caught up 🎉</p>
          </div>
        )}
      </div>

      
    </div>
  );
}
