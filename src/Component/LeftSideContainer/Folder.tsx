


import axios from "axios";
import createFolderIcon from "../../assets/images/CreateFolderIcon.png";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import openedFolder from "../../assets/images/folder_open.svg";
import closedFolder from "../../assets/images/folder_closed_Icon.svg";
import EditFolderName from "./EditFolderName";
import trashIcon from "../../assets/images/trash.svg";

interface FolderDataType {
  id: string;
  name: string;
}

function Folder() {
  const { folderId } = useParams(); // Access folderId from URL params
  const GetFolderAPI = "https://nowted-server.remotestate.com/folders";
  const [fetchedData, setFetchedData] = useState<FolderDataType[]>([]);

  const getFolderData = async () => {
    try {
      const response = await axios.get(GetFolderAPI);
      const data = response.data.folders.map((folder: FolderDataType) => ({
        id: folder.id,
        name: folder.name,
      }));

      setFetchedData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFolderData(); 
  }, []);

  const handleDelete = async (folderId: string) => {
    const DeleteApi = `https://nowted-server.remotestate.com/folders/${folderId}`;
    try {
      await axios.delete(DeleteApi);
      setFetchedData((prev) => prev.filter((folder) => folder.id !== folderId));
      alert("Successfully deleted Folder!");
      getFolderData();
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const AddNewFolder = async () => {
    const folderPostApi = `https://nowted-server.remotestate.com/folders`;
    try {
      await axios.post(folderPostApi, {
        name: "New folder 3",
      });

      alert("Successfully created New Folder!");
    } catch (error) {
      console.log(error);
      alert("Error in creating Folder");
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

      <div className="flex-grow overflow-y-auto scrollbar-hide">
        {fetchedData.map((d) => (
          <div
            key={d.id}
            className={`flex py-3 px-5 justify-between ${
              d.id === folderId ? "bg-slate-800" : ""
            }`}
          >
            <NavLink
              to={`/${d.name}/${d.id}`}
              className="flex flex-row w-full gap-4 cursor-pointer"
            >
              <img src={d.id === folderId ? openedFolder : closedFolder} alt="Folder Icon" />
              <EditFolderName id={d.id} name={d.name} setFetchedData={setFetchedData} />
            </NavLink>

            <NavLink to={"/"}>
              <img
                className="cursor-pointer text-gray-400"
                src={trashIcon}
                alt="Delete Folder"
                onClick={() => handleDelete(d.id)}
              />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Folder;
