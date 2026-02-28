import { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Flag,
  Share2
} from "lucide-react";
import { useSelector } from "react-redux";
export default function MoreMenu({ onEdit, onDelete, onSpam, onShare,postOwnerId }) {
  const [open, setOpen] = useState(false);
const user=useSelector(state=>state.user)
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <MoreHorizontal
        className="text-gray-600 cursor-pointer hover:text-gray-800 transition"
        size={20}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
        {user.user?._id==postOwnerId._id && <button
            onClick={onEdit}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
          >
            <Edit size={16} />
            Edit
          </button>}
          <button
            onClick={onDelete}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
          >
            <Trash2 size={16} />
            { user.user?._id==postOwnerId._id ?"Delete" : "delete from me"}
          </button>
          <button
            onClick={onSpam}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
          >
            <Flag size={16} />
            Spam
          </button>
          <button
            onClick={onShare}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      )}
    </div>
  );
}
