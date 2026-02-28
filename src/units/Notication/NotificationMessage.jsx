

export const NotificationMessage=({avatar,message,fullname,useranme})=>{
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
        {message}
      </p>

      <div className="h-px bg-black/5 my-2" />

      <div className="flex items-center justify-between text-[13px] text-gray-500">

        <button
          className="flex items-center gap-1.5 hover:text-blue-500 transition"
        >
          <Reply size={15} strokeWidth={1.8} />
          Answer
        </button>

        <button
          className="flex items-center gap-1.5 hover:text-rose-500 transition"
        >
          <Heart size={15} strokeWidth={1.8} />
          Like
        </button>

        <span className="flex items-center gap-1.5 text-gray-400">
          <Eye size={15} strokeWidth={1.8} />
          Read
        </span>

      </div>
    </div>
  </div>
);

}

