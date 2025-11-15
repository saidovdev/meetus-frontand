import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { t } from "i18next";
import { edit_info, removeEditStates } from "../../features/profile.features/rename.user.profile.js";
import { changePage } from "../../features/navigator.features/navigator.js";
import toast from "react-hot-toast";

export default function EditBirthdate() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, reportError, success } = useSelector((state) => state.profileRename);

  const [birthdate, setBirthdate] = useState(user?.birthdate || "");
  const [error, setError] = useState("");

  // Validatsiya funksiyasi — yoshi 10 dan katta bo'lishi kerak
  const isOldEnough = (date) => {
    const birth = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  useEffect(() => {
    if (reportError) setError(reportError);
  }, [loading, reportError, success]);

  const handleSave = () => {
    if (!birthdate) {
      toast.error(t("serverError.error") || "Please select your birthdate");
      return;
    }

    if (isOldEnough(birthdate) < 10) {
      toast.error(t("profile.tooYoung") || "You must be at least 10 years old.");
      return;
    }

    dispatch(edit_info({ key: "birthdate", value: birthdate }));
  };

  const handleBack = () => {
    dispatch(changePage({ page: "edit" }));
    dispatch(removeEditStates());
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-blue-500 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          {t("profile.editProfile") || "Edit Profile"}
        </h1>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-2">
        {t("profile.birthdateDesc") || "Select your birth date (you must be 10+)."}
      </p>

      {/* Input */}
      <div className="relative w-full">
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className={`w-full px-4 py-2 bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 text-sm sm:text-base ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          max={new Date().toISOString().split("T")[0]} // bugungi kundan katta sana bo‘lmasin
        />
        <Calendar size={18} className="absolute right-3 top-2.5 text-gray-400" />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className={`mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition flex justify-center items-center text-sm sm:text-base ${
          loading ? "opacity-80 cursor-not-allowed" : ""
        }`}
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : (t("profile.save") || "Save")}
      </button>
    </div>
  );
}
