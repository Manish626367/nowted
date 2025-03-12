


import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; 
import axios from "axios";
import Documenticon from "../../assets/images/Document.svg";

function Resents() {
  interface dataType {
    id: string;
    title: string;
    folder:{
      id:string,
      name:string,
    }
  }

  const [fetchedData, setfetchedData] = useState<dataType[]>([]);

  const GetRecentAPI = "https://nowted-server.remotestate.com/notes/recent";

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(GetRecentAPI);


        setfetchedData(response.data.recentNotes);

      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="w-full text-gray-400 font-semibold gap-1">
        <p className="text-md px-5 pb-2">Recents</p>

        {fetchedData.map((d) => {
          return (
            <NavLink 
              to={`/${d.folder.name}/${d.folder.id}/note/${d.id}`}
              key={d.id}
              className={({ isActive }) =>
                `flex flex-row gap-4 py-3 px-5 cursor-pointer ${
                  isActive ? "bg-blue-800 text-white" : "hover:bg-slate-800"
                }`
              }
            >
              <img src={Documenticon} alt="Document Icon" />
              <p>{d.title}</p>
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

export default Resents;