import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, Phone, Loader2 } from "lucide-react";
import { t } from "i18next";
import { edit_info, removeEditStates } from "../../features/profile.features/rename.user.profile.js";
import { changePage } from "../../features/navigator.features/navigator.js";
import toast from "react-hot-toast";

const COUNTRIES = [
  { code: "+992", label: "TJK" },
  { code: "+998", label: "UZB" },
];

export default function EditPhone() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  const { loading, reportError } = useSelector((s) => s.profileRename || {});

  // Parse initial phone
  const initialPhone = user?.phone || "";
  let initialCountryIndex = 0;
  let initialLocal = initialPhone;

  if (initialPhone.startsWith("+998")) {
    initialCountryIndex = 1;
    initialLocal = initialPhone.slice(4);
  } else if (initialPhone.startsWith("+992")) {
    initialCountryIndex = 0;
    initialLocal = initialPhone.slice(4);
  } else {
    initialLocal = initialPhone.replace(/\D/g, "");
  }

  const [countryIndex, setCountryIndex] = useState(initialCountryIndex);
  const [localNumber, setLocalNumber] = useState(initialLocal);
  const [error, setError] = useState("");

  useEffect(() => {
    if (reportError) setError(reportError);
  }, [reportError]);

  const handleBack = () => {
    dispatch(removeEditStates());
    dispatch(changePage({ page: "edit" }));
  };

  const handleLocalChange = (val) => {
    if (/^\d*$/.test(val)) setLocalNumber(val);
  };

  const handleCountryChange = (idx) => {
    setCountryIndex(idx);
  };

  const handleSave = () => {
    const code = COUNTRIES[countryIndex].code;
    const digits = localNumber.replace(/\D/g, "");
    if (!digits) {
      setError("Please enter phone number");
      return;
    }

    const full = `${code}${digits}`;
    const onlyDigits = full.replace(/\D/g, "");
    if (onlyDigits.length > 13) {
      setError("Phone is too long (max 13 digits including country code)");
      return;
    }
    if (onlyDigits.length < 8) {
      setError("Phone is too short");
      return;
    }

    dispatch(edit_info({ key: "phone", value: full }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={handleBack} className="text-gray-600 hover:text-blue-500 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{t("profile.editProfile") || "Edit Profile"}</h1>
      </div>

      <p className="text-sm text-gray-500 mb-2">{t("profile.phoneDesc") || "Enter your phone number."}</p>

      <div className="flex gap-3 items-center">
        {/* Country Selector */}
        <select
          value={countryIndex}
          onChange={(e) => handleCountryChange(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {COUNTRIES.map((c, i) => (
            <option key={c.code} value={i}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Phone Input */}
        <div className="relative flex-1">
          <input
            type="tel"
            value={localNumber}
            onChange={(e) => handleLocalChange(e.target.value)}
            placeholder="901234567"
            className={`w-full px-4 py-2 bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          <Phone size={16} className="absolute right-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

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
