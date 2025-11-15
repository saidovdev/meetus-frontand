import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, Loader2, Pencil } from "lucide-react";
import { t } from "i18next";
import { edit_info, removeEditStates } from "../../features/profile.features/rename.user.profile.js";
import { changePage } from "../../features/navigator.features/navigator.js";
import toast from "react-hot-toast";

export default function EditBio() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  const { loading, reportError } = useSelector((s) => s.profileRename || {});
  const [bio, setBio] = useState(user?.bio || "");
  const [error, setError] = useState("");

  const MAX = 370;

  useEffect(() => {
    if (reportError) setError(reportError);
  }, [reportError]);

  const handleChange = (val) => {
    if (val.length <= MAX) {
      setBio(val);
      setError("");
    }
  };

  const handleSave = () => {
    if (bio.length > MAX) {
      setError(`Max ${MAX} characters`);
      return;
    }
    dispatch(edit_info({ key: "bio", value: bio }));
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
        {t("profile.bioDesc") || "Write a short bio — up to 370 characters."}
      </p>

      <textarea
        value={bio}
        onChange={(e) => handleChange(e.target.value)}
        rows={6}
        placeholder={t("profile.bioPlaceholder") || "Tell something about yourself..."}
        className={`w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
        <p>{error ? <span className="text-red-500">{error}</span> : `${bio.length}/${MAX}`}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : t("profile.save") || "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
