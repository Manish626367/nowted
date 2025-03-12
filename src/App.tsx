

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RefreshProvider } from "./context/ForRefresh";
import { useState } from "react";
import { ROUTES } from "./constants/ConstantRoute"; 
import CommonRoutes from "./Component/Routes/CommonRoutes";

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
       <Route path={ROUTES.HOME} element={<CommonRoutes/>}/>

       <Route path={ROUTES.FAVORITE} element={<CommonRoutes/>}/>
       <Route path={ROUTES.FAVORITE_NOTE_ID} element={<CommonRoutes/>}/>

       <Route path={ROUTES.ARCHIVE} element={<CommonRoutes/>}/>
       <Route path={ROUTES.ARCHIVE_NOTE_ID} element={<CommonRoutes/>}/>

       <Route path={ROUTES.DELETE} element={<CommonRoutes/>}/>
       <Route path={ROUTES.DELETE_NOTE_ID} element={<CommonRoutes/>}/>

       <Route path={ROUTES.FOLDER} element={<CommonRoutes/>}/>
       <Route path={ROUTES.FOLDER_NOTE_ID} element={<CommonRoutes/>}/>
         
       </Routes>
     
     </Router>
    </RefreshProvider>
     </>
    );
  }
  
  export default App;
  







