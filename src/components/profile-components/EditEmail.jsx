import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { t } from "i18next";
import { edit_info, removeEditStates } from "../../features/profile.features/rename.user.profile.js";
import { changePage } from "../../features/navigator.features/navigator.js";
import toast from "react-hot-toast";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EditEmail() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  const { loading, reportError } = useSelector((s) => s.profileRename || {});
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (reportError) setError(reportError);
  }, [reportError]);

  const handleChange = (val) => {
    setEmail(val);
    setError("");
  };

  const handleSave = () => {
    if (!EMAIL_REGEX.test(email)) {
      setError(t("profile.invalidEmail") || "Invalid email format");
      return;
    }
    dispatch(edit_info({ key: "email", value: email }));
  };

  const handleBack = () => {
    dispatch(removeEditStates());
    dispatch(changePage({ page: "edit" }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={handleBack} className="text-gray-600 hover:text-blue-500 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{t("profile.editProfile") || "Edit Profile"}</h1>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        {t("profile.emailDesc") || "Enter a valid email address."}
      </p>

      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="you@example.com"
          className={`w-full px-4 py-2 bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <Mail size={16} className="absolute right-3 top-2.5 text-gray-400" />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition flex justify-center items-center"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : t("profile.save") || "Save"}
      </button>
    </div>
  );
}
