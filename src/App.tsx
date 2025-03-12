

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FavoritesRoute from "./Component/Routes/FavoritesRoute";
import HomeRoute from "./Component/Routes/HomeRoute";
import FavoritesNoteId from "./Component/Routes/FavoritesNoteId";
import ArchiveRoute from "./Component/Routes/ArchiveRoute";
import ArchiveNoteIdRoute from "./Component/Routes/ArchiveNoteIdRoute";
import DeleteRoute from "./Component/Routes/DeleteRoute";
import DeleteNoteIdRoute from "./Component/Routes/DeleteNoteIdRoute";
import FoldernameFolderId from "./Component/Routes/FoldernameFolderId";
import FolderNameNoteId from "./Component/Routes/FolderNameNoteId";
import { RefreshProvider } from "./context/ForRefresh";
import { useState } from "react";

function App() {

const [isFresh,setIsFresh] = useState(false);
const [isRender,setIsRender] = useState(false);

const isFreshFunction = ()=>{
     setIsFresh(p=>!p);
}
const isRenderFunction=()=>{
     setIsRender(p=>!p);
}

    return (
     <>
     
  <RefreshProvider value={{isFresh,isRender, isRenderFunction,isFreshFunction}}>
    <Router>
       
       <Routes>
       <Route path="/" element={<HomeRoute/>}/>

       <Route path="/favorites" element={<FavoritesRoute/>}/>
       <Route path="/favorites/note/:noteId" element={<FavoritesNoteId/>}/>

       <Route path="/Archived" element={<ArchiveRoute/>}/>
       <Route path="/Archived/note/:noteId" element={<ArchiveNoteIdRoute/>}/>

       <Route path="/Deleted" element={<DeleteRoute/>}/>
       <Route path="/Deleted/note/:noteId" element={<DeleteNoteIdRoute/>}/>

       <Route path="/:folderName/:folderId" element={<FoldernameFolderId/>}/>
       <Route path="/:folderName/:folderId/note/:noteId" element={<FolderNameNoteId/>}/>
         
       </Routes>
     
     </Router>
    </RefreshProvider>
     </>
    );
  }
  
  export default App;
  







