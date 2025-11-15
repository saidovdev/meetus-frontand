import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, ArrowLeft, Loader2 } from "lucide-react";
import { t } from "i18next";
import { edit_info, removeEditStates } from "../../features/profile.features/rename.user.profile.js";
import { changePage } from "../../features/navigator.features/navigator.js";
import toast from "react-hot-toast";

export default function RenameFullname() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, reportError, success } = useSelector((state) => state.profileRename);

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (reportError) setError(reportError);
  }, [reportError, success]);

  const handleChange = (value) => {
    if (/^[A-Za-zА-Яа-яЁё\s'-]{0,50}$/.test(value) || value === "") {
      setFullname(value);
      setError("");
    } else {
      setError(t("profile.invalidName") || "Invalid characters in name");
    }
  };

  const handleSave = () => {
    if (!fullname.trim()) {
      toast.error(t("serverError.error") || "Name cannot be empty");
      return;
    }
    if (fullname.length > 50) {
      toast.error(t("profile.nameTooLong") || "Name is too long");
      return;
    }
    dispatch(edit_info({ key: "fullname", value: fullname.trim() }));
  };

  const handleBack = () => {
    dispatch(changePage({ page: "edit" }));
    dispatch(removeEditStates());
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
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

      <p className="text-sm text-gray-500 mb-2">
        {t("profile.fullnameDesc") || "Enter your full name (first and last name)."}
      </p>

      <div className="relative">
        <input
          type="text"
          value={fullname}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="John Doe"
          className={`w-full px-4 py-2 bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <Pencil size={16} className="absolute right-3 top-2.5 text-gray-400" />
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
