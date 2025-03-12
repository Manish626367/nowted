


import { useState, memo } from "react";
import axios from "axios";
import useFresh from "../../context/ForRefresh";

interface EditFolderNameType {
  id: string;
  name: string;
  setFetchedData: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>;
}

const EditFolderName: React.FC<EditFolderNameType> = memo(({ id, name, setFetchedData }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(name);

  const {isFreshFunction}=useFresh();

  const Api = `https://nowted-server.remotestate.com/folders/${id}`
  

  const handleSaveAPI = async () => {
    try {
      await axios.patch(Api, {
        name: editText,
      });
      setFetchedData((prev) =>
        prev.map((folder) =>
          folder.id === id ? { ...folder, name: editText } : folder
        )
      );
    } catch (error) {
      console.error("Error updating folder name:", error);
    }    

    setIsEditing(false);
    isFreshFunction();
    
  };

  return isEditing ? (
    <input
      type="text"
      className="bg-transparent border-b border-gray-500 focus:outline-none text-white"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onBlur={handleSaveAPI}
      onKeyDown={(e) => e.key === "Enter" && handleSaveAPI()}
      autoFocus
    />
  ) : (
    <p onDoubleClick={() => setIsEditing(true)}>{name}</p>
  );
});

export default EditFolderName;