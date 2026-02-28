
import { toast } from 'sonner';
import Notification from '../../components/notification/Tools/Notification.jsx'
import { Heart, Reply, Eye } from "lucide-react";
export const showNotification = ({
  avatar,
  fullname,
  username,
  message,
  text,
  postId,
  notificationType,
  senderId
}) => {
  toast.custom((t) => (
    <Notification
      avatar={avatar}
      fullname={fullname}
      username={username}
      message={message || null}
      text={text||null}
      postId={postId || null}
      notificationType={notificationType||''}
      senderId={senderId || null}
    />
  ), {
    duration: 4000,
  });
};
