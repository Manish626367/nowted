// import CreateNote from "./CreateNote"
import Folder from "./Folder";
import LogoSearch from "./LogoSearch";
import More from "./More";
import Resents from "./Resents";

function LeftContainer() {
  return (
    <div className="flex flex-col gap-8">
        <LogoSearch />
        <Resents />
        <Folder />
        <More />
         
     </div>
  );
}

export default LeftContainer;


