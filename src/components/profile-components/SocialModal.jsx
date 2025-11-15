import React from "react";
import { X, Instagram, Send, Phone, Mail, Copy, Globe } from "lucide-react";
import { t } from "i18next";
export default function SocialModal({ onClose, user }) {
  const links = [
    { key: "instagram", label: "Instagram", icon: <Instagram className="text-pink-500" /> },
    { key: "telegram", label: "Telegram", icon: <Send className="text-blue-500" /> },
    { key: "whatsApp", label: "WhatsApp", icon: <Phone className="text-green-500" /> },
    { key: "email", label: "Email", icon: <Mail className="text-red-500" /> },
    { key: "phone", label: "Phone", icon: <Phone className="text-gray-500" /> },
  ];

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  const openLink = (key, value) => {
    if (key === "email") window.open(`mailto:${value}`);
    else if (key === "phone" || key === "whatsApp") window.open(`tel:${value}`);
    else window.open(value.startsWith("http") ? value : `https://${value}`, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-5 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {t('profile.title')}
        </h2>

        <div className="space-y-3">
          {links.map(
            (item) =>
              user?.socialLinks?.[item.key] && (
                <div
                  key={item.key}
                  className="flex items-center justify-between border rounded-xl px-3 py-2 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm text-gray-700 break-all">
                      {user.socialLinks[item.key]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openLink(item.key, user.socialLinks[item.key])}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
                    >
                      <Globe size={14} /> Open
                    </button>
                    <button
                      onClick={() => handleCopy(user.socialLinks[item.key])}
                      className="text-gray-500 hover:text-gray-700 text-xs font-medium flex items-center gap-1"
                    >
                      <Copy size={14} /> Copy
                    </button>
                  </div>
                </div>
              )
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
