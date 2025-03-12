
import selectNote from "../../assets/images/selectNote.svg";

function SelectNoteCompo() {
  return (
    <div className="flex flex-col items-center justify-center h-screen font-semibold gap-3">
          <img src={selectNote} />
          <p className="text-4xl font-semibold">Select a note to view</p>
          <p className="text-gray-400 px-8">Choose a note from the list on the left to view its contents, or create a new note to add to your collection.</p>
    </div>
  )
}

export default SelectNoteCompo