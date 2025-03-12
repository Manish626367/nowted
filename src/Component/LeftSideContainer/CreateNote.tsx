

import axios from "axios";
import { useParams } from "react-router-dom";
import useFresh from "../../context/ForRefresh";

function CreateNote() {
  const { folderId } = useParams(); 

  const {isFreshFunction} = useFresh();

  const PostNoteApi="https://nowted-server.remotestate.com/notes"
  
  const handleCreateNote = async () => {
    if (!folderId) {
      console.error("Folder ID is missing!");
      return;
    }
    try {
       await axios.post(PostNoteApi, {
        folderId,
        title: "New Note 1",
        content: "This is a new note.",
        isFavorite: false,
        isArchived: false,
      });
      isFreshFunction();
      
      alert("Successfully created note !")

    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="px-5 cursor-pointer">
      <button
        className="w-full h-13 text-xl font-semibold rounded-md bg-createNew hover:bg-slate-50  hover:text-black cursor-pointer"
        onClick={handleCreateNote}
      >
        <span className="text-3xl pr-1">+</span> New Note
      </button>
    </div>
  );
}

export default CreateNote;




