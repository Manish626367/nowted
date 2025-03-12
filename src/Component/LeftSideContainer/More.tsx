import favoriteicon from "../../assets/images/favorites.png";
import trashIcon from "../../assets/images/trashicon.svg";
import archivedIcon from "../../assets/images/archieved.png";

import { NavLink } from "react-router-dom";

function More() {
   
  return (
    <>
      <div className="w-full text-gray-400 font-semibold gap-1 ">
        <p className="text-md px-5 pb-2 ">Recents</p>
        <NavLink to={`/favorites`}>
          <button className="flex flex-row w-full gap-4 py-3 px-5 cursor-pointer  hover:bg-slate-900">
            <img src={favoriteicon} /> Favorites
          </button>
        </NavLink>

        <NavLink to="/Deleted">
        <button className="flex flex-row w-full gap-4 py-3 px-5 cursor-pointer hover:bg-slate-900">
          <img src={trashIcon} alt="Trash" /> Trash
        </button>
        </NavLink>

        <NavLink to={`/Archived`}>
          <button className="flex flex-row w-full gap-4 py-3 px-5 cursor-pointer  hover:bg-slate-900">
            <img src={archivedIcon} /> Archived Notes
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default More;
