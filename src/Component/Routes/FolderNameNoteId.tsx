import MiddleComponents from "../FolderComponents/MiddleComponents"
import LeftContainer from "../LeftSideContainer/LeftContainer"
import ShowNotesContent from "../MainComponents/ShowNotesContent"


function FolderNameNoteId() {
  return (
    
    <div className="flex w-full h-screen border border-none">
    <div className="w-6/28 h-screen py-7">
      <LeftContainer />
    </div>

    <div className="w-7/28 bg-MiddleCompo h-screen px-5 overflow-y-auto scrollbar-hide">
      <MiddleComponents />
    </div>

    <div className="w-15/28 h-screen overflow-y-auto px-5 scrollbar-hide ">
      <ShowNotesContent />
    </div>
  </div>
  )
}

export default FolderNameNoteId