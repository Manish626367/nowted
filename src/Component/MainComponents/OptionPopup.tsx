

import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import favoriteIcon from "../../assets/images/Favorites.svg";
import trashIcon from "../../assets/images/trashicon.svg";
import archivedIcon from "../../assets/images/Archieved.svg";
import MainEditButton from "./MainEditButton";
import DeleteNote from "./DeleteNote";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import useFresh from "../../context/ForRefresh";

const OptionPopup = ({ closePopup }: { closePopup: () => void }) => {

  const {isRenderFunction} = useFresh();

  const navigate = useNavigate();
  const { noteId, folderName, folderId } = useParams();
  const location = useLocation();
  const section = location.pathname.split("/")[1];

  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [isArchived, setIsArchived] = useState<boolean | null>(null);

  useEffect(() => {
    if (!noteId) return;

    const fetchNote = async () => {
      try {
        const response = await axios.get(`https://nowted-server.remotestate.com/notes/${noteId}`);
        setIsArchived(response.data.note.isArchived);
        setIsFavorite(response.data.note.isFavorite);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const updateNoteStatus = async (type: string) => {
    if (!noteId) return;
    const UpdateNoteApi =   `https://nowted-server.remotestate.com/notes/${noteId}`

    try {
      const response = await axios.patch(
        UpdateNoteApi,
        type === "Favorite" ? { isFavorite: !isFavorite } : { isArchived: !isArchived },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status >= 200 && response.status < 300) {
        const updatedNote = response.data;

        if (type === "Favorite") {
        
          setIsFavorite(updatedNote.isFavorite);

          if(!isFavorite) alert("Added to Favorites!");
          else alert( "Unarchived Successfully!");

          if (section === 'favorites') navigate('/favorites');

        } else {
          setIsArchived(updatedNote.isArchived);
          if(!isArchived) alert("Archived Successfully!");
          else alert( "Unarchived Successfully!");

         
           if(folderId && folderName)
          {
            
            navigate(`/${folderName}/${folderId}`)
          }
          else if(section==='Recent') navigate('/')
          else  navigate(`/${section}`);
        }

      }
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      alert(`Error updating ${type}!`);
    }
    closePopup();
  };

  const handleDelete = async () => {
    if (!noteId) return;
    try {
      await DeleteNote(noteId);
      alert("Deleted Successfully!");

      isRenderFunction();

      if(folderId && folderName)
           navigate(`/${folderName}/${folderId}/note/${noteId}`)
      else  navigate(`/${section}/note/${noteId}`);
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error in deleting!");
    }
    closePopup();
  };

  return (
    <div className="absolute top-12 right-0 bg-white dark:bg-gray-900 shadow-md rounded-md p-2 w-40 border">
      <MainEditButton
        icon={favoriteIcon}
        text={isFavorite ? "Unfavorite" : "Favorite"}
        onClick={() => updateNoteStatus("Favorite")}
      />

      <MainEditButton
        icon={archivedIcon}
        text={isArchived ? "Unarchive" : "Archive"}
        onClick={() => updateNoteStatus("Archive")}
      />

        <MainEditButton icon={trashIcon} text="Delete" onClick={handleDelete} />
    
      <button
        className="text-center w-full px-3 py-2 bg-white text-black hover:bg-blue-800 hover:text-white cursor-pointer rounded-xl"
        onClick={closePopup}
      >
        <p>Close</p>
      </button>
    </div>
  );
};

export default OptionPopup;

