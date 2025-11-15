import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, MapPin, Loader2 } from "lucide-react";
import { t } from "i18next";
import { edit_info, removeEditStates } from "../../features/profile.features/rename.user.profile.js";
import { changePage } from "../../features/navigator.features/navigator.js";
import toast from "react-hot-toast";

export default function EditLocation() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  const { loading, reportError } = useSelector((s) => s.profileRename || {});

  const [query, setQuery] = useState(user?.location || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (reportError) setError(reportError);
  }, [reportError]);

  const handleBack = () => {
    dispatch(removeEditStates());
    dispatch(changePage({ page: "edit" }));
  };

  const MAX_LEN = 60;
  const WARN_LEN = 30; 

  const handleChange = (val) => {
    setQuery(val);
    setError("");
  };

  const handleSave = () => {
    const trimmed = (query || "").trim();
    if (!trimmed) {
      toast.error(t("serverError.error") || "Please enter a location");
      return;
    }
    if (trimmed.length > MAX_LEN) {
      setError(`Location is too long — max ${MAX_LEN} characters`);
      return;
    }

    dispatch(edit_info({ key: "location", value: trimmed }));
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
        {t("profile.locationDesc") || "Enter your city or place."}
      </p>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter your location..."
          maxLength={MAX_LEN}
          className="w-full px-4 py-2 bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
        />
        <MapPin size={16} className="absolute right-3 top-2.5 text-gray-400" />
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className={`text-sm ${query.length > WARN_LEN ? "text-yellow-600" : "text-gray-500"}`}>
          {query.length > WARN_LEN ? "Too long" : `${query.length}/${MAX_LEN}`}
        </p>
        {error ? <p className="text-red-500 text-sm">{error}</p> : null}
      </div>

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
