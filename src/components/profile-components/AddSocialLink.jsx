import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash, Check, Loader2 } from "lucide-react";
import { t } from "i18next";
import { add_contact } from "../../features/profile.features/user.contact.js";
import { emailRegex } from "../../config/testRegex.js";
import { changePage } from "../../features/navigator.features/navigator";

export default function AddSocialLink() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, success, reportError } = useSelector((state) => state.contact);

  const [instagram, setInstagram] = useState(user?.socialLinks?.instagram || "");
  const [telegram, setTelegram] = useState(user?.socialLinks?.telegram || "");
  const [whatsApp, setWhatsApp] = useState(user?.socialLinks?.whatsApp || "");
  const [phone, setPhone] = useState(user?.socialLinks?.phone || "");
  const [email, setEmail] = useState(user?.socialLinks?.email || "");
  const [warning, setWarning] = useState(reportError || "");

  const initialFields = [
    { key: "instagram", label: t("profile.instagram") || "Instagram", value: instagram, setValue: setInstagram },
    { key: "whatsApp", label: t("profile.whatsApp") || "WhatsApp", value: whatsApp, setValue: setWhatsApp },
    { key: "telegram", label: t("profile.telegram") || "Telegram", value: telegram, setValue: setTelegram },
    { key: "phone", label: t("profile.phone") || "Phone", value: phone, setValue: setPhone },
    { key: "email", label: t("profile.email") || "Email", value: email, setValue: setEmail },
  ];

  const handleSave = () => {
    if (instagram && !instagram.startsWith("https://instagram.com/")) {
      return setWarning(t("profile.instagramWorse"));
    }
    if (telegram && !telegram.startsWith("https://t.me/")) {
      return setWarning(t("profile.telegramWorse"));
    }
    if (whatsApp && !whatsApp.startsWith("https://wa.me/")) {
      return setWarning(t("profile.whatsAppWorse"));
    }
    if (phone && !phone.startsWith("+992")) {
      return setWarning(t("profile.phoneWorse"));
    }
    if (email && !emailRegex.test(email)) {
      return setWarning(t("profile.emailWorse"));
    }

    setWarning("");
    dispatch(add_contact({ email, instagram, telegram, whatsApp, phone }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm sticky top-0">
        <button
          className="mr-3 text-gray-600 hover:text-blue-500 transition"
          onClick={() => dispatch(changePage({ page: "profile" }))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{t("profile.editSocialLinks") || "Edit Social Links"}</h1>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 w-full max-w-lg mx-auto">
        {initialFields.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white shadow-sm rounded-xl px-4 py-3 flex flex-col sm:flex-row justify-between sm:items-center border border-gray-200 focus-within:border-blue-400 transition"
          >
            <div className="flex flex-col w-full sm:w-1/3">
              <label className="text-xs text-gray-500 mb-1">{item.label}</label>
            </div>

            <input
              type={item.key!== "phone"? 'text':'number'}
              onChange={(e) => item.setValue(e.target.value)}
              className="w-full sm:w-2/3 border bg-white   border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={item.label}
              value={item.value}
            />
          </div>
        ))}

        {warning && (
          <p className="text-red-500 text-sm text-center bg-red-50 px-3 py-2 rounded-lg shadow-sm">
            ⚠ {warning}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-medium transition flex justify-center items-center"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : t("profile.save")}
        </button>
      </div>
    </div>
  );
}
