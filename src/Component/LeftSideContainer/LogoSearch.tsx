
import PencilImg from "../../assets/images/Frame.png";
import SearchImg from "../../assets/images/search.png";
import CreateNote from "./CreateNote";
import { useState } from "react";
import SearchNote from "../Search/SearchNote";

function LogoSearch() {
  
 const [isSearch , setisSearch] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-7">
      <div className="flex justify-between items-center px-5">
        <div className="flex ">
          <h1 className="text-4xl font-kausan pr-3">nowted</h1>
         <img src={PencilImg} alt="Logo" className="h-4"></img>
        </div>
        <div>
           {
            !isSearch?<img src={SearchImg} onClick={()=>setisSearch((p)=>!p)} alt="search icon"></img>:<p className="cursor-pointer text-red-600" onClick={()=>setisSearch((p)=>!p)}>X</p>
           }
        </div>
      </div>
      <div>
        {
          isSearch ? <SearchNote/> : <CreateNote/>
        }
      </div>
      </div>
    </>
  );
}

export default LogoSearch;
