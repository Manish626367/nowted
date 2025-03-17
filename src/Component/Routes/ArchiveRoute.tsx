
import Middle from "../FolderComponents/Middle"
import LeftContainer from "../LeftSideContainer/LeftContainer"
import SelectNoteCompo from "../MainComponents/SelectNoteCompo"


function ArchiveRoute() {
  return (
    <div className="flex w-full h-screen border border-none">
      <div className="w-6/28 h-screen py-7">
        <LeftContainer />
      </div>

      <div className="w-7/28 bg-MiddleCompo h-screen px-5 overflow-y-auto scrollbar-hide">
        {/* <ShowArchive /> */}
        <Middle type={'Archived'}/>
      </div>

      <div className="w-15/28 h-screen overflow-y-auto px-5">
        <SelectNoteCompo />
      </div>
    </div>
  )
}

export default ArchiveRoute