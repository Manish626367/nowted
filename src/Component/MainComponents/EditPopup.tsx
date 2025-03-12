



import { useState, useCallback } from "react";
import editNotesIcon from "../../assets/images/editIcon.svg";
import OptionPopup from "./OptionPopup";

function EditPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = useCallback(() => setShowPopup(false), []);

  return (
    <div className="relative">
      <img
        src={editNotesIcon}
        className="cursor-pointer h-9 w-10 pb-1"
        onClick={() => setShowPopup((prev) => !prev)}
      />
      {showPopup && (
        <OptionPopup closePopup={closePopup} />
      )}
    </div>
  );
}

export default EditPopup;
