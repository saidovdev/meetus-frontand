import { NotifcationFollow } from "../../../units/Notication/NotificationFollow";
import { NotificationMessage } from "../../../units/Notication/NotificationMessage";
import { NotificationPost } from "../../../units/Notication/NotificationPost";
import { useSwipeDismiss } from "../../../units/Notication/useSwipeDismiss";

const Notification = ({
  id,
  notificationType,
  avatar,
  fullname,
  message,
  text,
  postId,
  username,
  senderId,
  onDismiss,
}) => {
  const { offsetX, handlers } = useSwipeDismiss()

  return (
    <div
      {...handlers}
      className="transition-transform duration-200"
      style={{
        transform: `translateX(${offsetX}px)`,
        opacity: 1 - offsetX / 200,
      }}
    >
      {notificationType === "collaborator" ||
      notificationType === "like-coment-share" ? (
        <NotificationPost
          avatar={avatar}
          fullname={fullname}
          text={text}
          postId={postId}
          username={username}
        />
      ) : notificationType === "message" ? (
        <NotificationMessage
          avatar={avatar}
          fullname={fullname}
          message={message}
          username={username}
        />
      ) : notificationType === "follow-unfollow" ? (
        <NotifcationFollow
          avatar={avatar}
          fullname={fullname}
          text={text}
          followedId={senderId}
          username={username}
        />
      ) : null}
    </div>
  );
};

export default Notification;
