
import Folder from "./Folder";
import LogoSearch from "./LogoSearch";
import More from "./More";
import Resents from "./Resents";

function LeftContainer() {
  return (

    <div className="flex flex-col h-full gap-8">
    <LogoSearch />
    <Resents />
    <div className="flex-grow overflow-y-scroll min-h-[20vh] scrollbar-hide">
        <Folder />
    </div>
    <More />
  </div>


  );
}

export default LeftContainer;


