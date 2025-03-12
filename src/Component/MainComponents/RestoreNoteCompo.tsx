


import axios from "axios";
import restore from "../../assets/images/Restore.svg";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import useFresh from "../../context/ForRefresh";

interface Note {
  title: string;
  content: string;
  createdAt: string;
  folderId: string;
  folder: { name: string };
}

function RestoreNoteCompo() {
  const { noteId } = useParams();
  const [getNote, setGetNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


 const {isRenderFunction} = useFresh();


  const getFolderAPi =  `https://nowted-server.remotestate.com/notes/${noteId}`

  const getFolderDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        getFolderAPi
      );

      if (response.data && response.data.note) {
        setGetNote(response.data.note); 
      } else {
        console.error("Unexpected data structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching folder details:", error);
    }
  }, [getFolderAPi]);

  async function RestoreNote() {

   const RestoreApi = `https://nowted-server.remotestate.com/notes/${noteId}/restore`

    setLoading(true); 
    try {
      await axios.post(RestoreApi);
      console.log("Restored successfully!");

      // await getFolderDetails();
      isRenderFunction()
      
      
      
    } catch (error) {
      console.error("Error restoring note:", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getFolderDetails();
  }, [getFolderDetails]);

  function clickHandler() {
    RestoreNote();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen font-semibold gap-3">
      <img src={restore} />
      <p className="text-4xl font-semibold">
        Restore "{getNote?.title || 'Untitled Note'}"
      </p>
      <p className="text-gray-400 px-10">
        Don't want to lose this note? It's not too late! Just click the 'Restore' button and it will be added back to your list. It's that simple.
      </p>

      {loading && <p className="text-blue-500">Restoring...</p>}

      {getNote && (
       <NavLink to={`/${getNote.folder.name}/${getNote.folderId}/note/${noteId}`}>
              <button
                   onClick={clickHandler}
                   className="cursor-pointer bg-white text-black h-10 w-30 rounded-sm shadow hover:bg-blue-800 hover:text-white"
                 >
                   Restore
                 </button>
               </NavLink>
        
      )}
    </div>
  );
}

export default RestoreNoteCompo;

