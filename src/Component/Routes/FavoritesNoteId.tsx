
import ShowFavorites from "../favorite/ShowFavorites"
import LeftContainer from "../LeftSideContainer/LeftContainer"
import ShowNotesContent from "../MainComponents/ShowNotesContent"


function FavoritesNoteId() {
  return (
    
    <div className="flex w-full h-screen border border-none">
      <div className="w-6/28 h-screen py-7">
        <LeftContainer />
      </div>

      <div className="w-7/28 bg-MiddleCompo h-screen px-5 overflow-y-auto scrollbar-hide">
        <ShowFavorites />
      </div>

      <div className="w-15/28 h-screen overflow-y-auto px-5">
        <ShowNotesContent />
      </div>
    </div>
  )
}

export default FavoritesNoteId