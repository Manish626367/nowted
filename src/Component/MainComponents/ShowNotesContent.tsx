


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import dateIcon from "../../assets/images/DateIcon.svg";
// import closeFolderIcon from "../../assets/images/folder_closed_Icon.svg";
// import axios from "axios";
// import EditPopup from "./EditPopup";
// import EditNote from "./EditNote";
// import EditContent from "./EditContent";
// import useFresh from "../../context/ForRefresh";
// import RestoreNoteCompo from "./RestoreNoteCompo";

// interface Note {
//   title: string;
//   content: string;
//   createdAt: string;
//   deletedAt:string;
//   folder: { name: string };
// }

// function ShowNotesContent() {
//   const { noteId,title } = useParams();
//   const [getNote, setGetNote] = useState<Note | null>(null);

//   const { isRender, isRenderFunction} = useFresh();
//   const fetchApi =  `https://nowted-server.remotestate.com/notes/${noteId}`
  

//   useEffect(() => {

//     async function fetchNote() {
//       try {
//         const response = await axios.get(
//           fetchApi
//         );
//         setGetNote(response.data.note);

//       } catch (error) {
//         console.error("Error fetching note:", error);
//       }
//     }

//     fetchNote();
//   }, [noteId, isRender, fetchApi]);
  

//   if (!getNote) {
//     return <p className="text-center text-gray-400">Loading...</p>;
//   }


// // for title

//   const saveTitleHandler = async (id: string, newTitle: string) => {
//     if (!newTitle.trim()) return;
      
//     try {
//       await axios.patch(`https://nowted-server.remotestate.com/notes/${id}`, {
//         title: newTitle,
//       });
 

      
//       isRenderFunction();

//       setGetNote((prev) =>
//         prev ? { ...prev, title: newTitle } : prev
//       );
    

//     } catch (error) {
//       console.error("Error updating title:", error);
//     }
//   };


//   // for content 

//   const saveContentHandler = async (id: string, newContent: string) => {
//     if (!newContent.trim()) return;

//     try {
//       await axios.patch(`https://nowted-server.remotestate.com/notes/${id}`, {
//         content: newContent,
//       });

//       isRenderFunction();
      
//       setGetNote((prev) =>
//         prev ? { ...prev, content: newContent } : prev
//       );
//     } catch (error) {
//       console.error("Error updating title:", error);
//     }
//   };
  

//   return (
 
//       getNote.deletedAt ? <RestoreNoteCompo/>:
      
//     <div className="p-10 flex flex-col gap-6 relative ">
//       <div className="flex justify-between items-center">
//         <EditNote id={noteId!} name={title ? title : getNote.title} onSave={saveTitleHandler} />
//         <EditPopup />
//       </div>

//       <div>
//         <div className="flex gap-10 font-semibold py-6 border-b border-gray-700">
//           <div className="flex gap-4 text-gray-300">
//             <img src={dateIcon} alt="Date Icon" />
//             <p>Date</p>
//           </div>
//           <p className="border-b border-gray-300">{new Date(getNote.createdAt).toLocaleDateString()}</p>
//         </div>

//         <div className="flex gap-10 font-semibold py-6">
//           <div className="flex gap-4 text-gray-300">
//             <img src={closeFolderIcon} alt="Folder Icon" />
//             <p >Folder</p>
//           </div>
//           <p className="border-b border-gray-300">{getNote.folder.name}</p>
//         </div>
//       </div>

//       <div className="text-gray-200">
//         <EditContent id={noteId!} content={getNote.content} onSave={saveContentHandler}/>
//       </div>
//     </div>
    
//   );
// }

// export default ShowNotesContent;








import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dateIcon from "../../assets/images/DateIcon.svg";
import closeFolderIcon from "../../assets/images/folder_closed_Icon.svg";
import axios from "axios";
import EditPopup from "./EditPopup";
import EditNote from "./EditNote";
import EditContent from "./EditContent";
import useFresh from "../../context/ForRefresh";
import RestoreNoteCompo from "./RestoreNoteCompo";

interface Note {
  title: string;
  content: string;
  createdAt: string;
  deletedAt: string;
  folder: { name: string };
}

interface Folder {
  id: string;
  name: string;
}

function ShowNotesContent() {
  const { noteId, title } = useParams();
  const [getNote, setGetNote] = useState<Note | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const { isRender, isRenderFunction } = useFresh();
  const fetchApi = `https://nowted-server.remotestate.com/notes/${noteId}`;

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await axios.get(fetchApi);
        setGetNote(response.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    }

    async function fetchFolders() {
      try {
        const response = await axios.get(`https://nowted-server.remotestate.com/folders`);
        setFolders(response.data.folders);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    }

    fetchNote();
    fetchFolders();
  }, [noteId, isRender, fetchApi]);

  if (!getNote) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const saveTitleHandler = async (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;

    try {
      await axios.patch(`https://nowted-server.remotestate.com/notes/${id}`, {
        title: newTitle,
      });

      isRenderFunction();

      setGetNote((prev) => (prev ? { ...prev, title: newTitle } : prev));
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };


  const saveContentHandler = async (id: string, newContent: string) => {
    if (!newContent.trim()) return;

    try {
      await axios.patch(`https://nowted-server.remotestate.com/notes/${id}`, {
        content: newContent,
      });

      isRenderFunction();

      setGetNote((prev) => (prev ? { ...prev, content: newContent } : prev));
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };


  // Change folder
  const changeFolderHandler = async (folderId: string,folderName :string) => {
    try {
      await axios.patch(`https://nowted-server.remotestate.com/notes/${noteId}`, {
        folderId,
      });

      navigate(`/${folderName}/${folderId}/note/${noteId}`)

      const selectedFolder = folders.find((folder) => folder.id === folderId);
      setGetNote((prev) =>
        prev ? { ...prev, folder: { name: selectedFolder?.name || "" } } : prev
      );

      setShowDropdown(false);
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  return getNote.deletedAt ? (
    <RestoreNoteCompo />
  ) : (
    <div className="p-10 flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <EditNote
          id={noteId!}
          name={title ? title : getNote.title}
          onSave={saveTitleHandler}
        />
        <EditPopup />
      </div>

      <div>
        <div className="flex gap-10 font-semibold py-6 border-b border-gray-700">
          <div className="flex gap-4 text-gray-300">
            <img src={dateIcon} alt="Date Icon" />
            <p>Date</p>
          </div>
          <p className="border-b border-gray-300">
            {new Date(getNote.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-10 font-semibold py-6 relative cursor-pointer"  onClick={() => setShowDropdown(!showDropdown)}>
          <div className="flex gap-4 text-gray-300 cursor-pointer">
            <img src={closeFolderIcon} alt="Folder Icon" />
            <p>Folder</p>
          </div>
          <p className="border-b border-gray-300">{getNote.folder.name}</p>

          {showDropdown && (
            <div className="absolute max-h-70 overflow-y-auto scrollbar-hide top-14 left-28 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md p-2 w-48 z-10">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-700"
                  onClick={() => changeFolderHandler(folder.id , folder.name)}
                >
                  {folder.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-gray-200">
        <EditContent
          id={noteId!}
          content={getNote.content}
          onSave={saveContentHandler}
        />
      </div>
    </div>
  );
}

export default ShowNotesContent;
