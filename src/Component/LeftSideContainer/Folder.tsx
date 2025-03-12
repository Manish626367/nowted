

import axios from "axios";
import createFolderIcon from "../../assets/images/CreateFolderIcon.png";
import { useEffect, useState } from "react";
import openedFolder from "../../assets/images/folder_open.svg";
import closedFolder from "../../assets/images/folder_closed_Icon.svg";
import EditFolderName from "./EditFolderName";
import { NavLink } from "react-router-dom";
import trashIcon from "../../assets/images/trash.svg";

interface FolderDataType {
  id: string;
  name: string;
}

function Folder() {

  const GetFolderAPI = "https://nowted-server.remotestate.com/folders";
  const [fetchedData, setFetchedData] = useState<FolderDataType[]>([]);
  const [BgColorId, setBgColorId] = useState("");



  const getFolderData = async () => {
    try {
      const response = await axios.get(GetFolderAPI);
      const data = response.data.folders.map((folder: FolderDataType) => ({
        id: folder.id,
        name: folder.name,
      }));

      setFetchedData(data);
      if (data.length !== 0) {
        setBgColorId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFolderData();
  }, []);

  const handleDelete = async (folderId: string) => {
      const DeleteApi = `https://nowted-server.remotestate.com/folders/${folderId}`
    try {
      await axios.delete(DeleteApi);
      setFetchedData((prev) => prev.filter((folder) => folder.id !== folderId));
      alert("successfully deleted Folder !")
      getFolderData();
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const AddNewFolder = async () => {
      const folderPostApi = `https://nowted-server.remotestate.com/folders`
      try {
         await axios.post(folderPostApi, {
          name: "New folder 3",
        });
      
        alert("successfully created New Folder !")
       
      } catch (error) {
        console.log(error);
        alert("Error in creating Folder")
      }

      getFolderData();
    };

  return (
    <div className="w-full text-gray-400 font-semibold gap-1">
      <div className="flex justify-between px-5 pb-2">
        <p className="text-md">Folders</p>
        <img
          src={createFolderIcon}
          onClick={() => AddNewFolder()}
          className="h-6 cursor-pointer"
          alt="Create Folder"
        />
      </div>

      <div  className="flex-grow  overflow-y-auto scrollbar-hide">
        {fetchedData.map((d) => (
          <div
            key={d.id}
            className={`flex py-3 px-5 justify-between hover:bg-slate-800`}
          >
            <NavLink
              to={`/${d.name}/${d.id}`}
              className="flex flex-row w-full gap-4 cursor-pointer"
              onClick={() => setBgColorId(d.id)}
            >
              <img src={d.id === BgColorId ? openedFolder : closedFolder} alt="Folder Icon" />
              <EditFolderName id={d.id} name={d.name} setFetchedData={setFetchedData} />
            </NavLink>
           <NavLink to={"/"}> <img
              className="cursor-pointer text-gray-400"
              src={trashIcon}
              alt="Delete Folder"
              onClick={() => handleDelete(d.id)} 
            /></NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Folder;






