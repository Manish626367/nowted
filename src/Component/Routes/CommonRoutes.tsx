

import { useLocation, useParams } from "react-router-dom";
import ShowArchive from "../Archive/ShowArchive";
import LeftContainer from "../LeftSideContainer/LeftContainer";
import ShowNotesContent from "../MainComponents/ShowNotesContent";
import ShowDeletedNote from "../trash/ShowDeletedNotes";
import ShowFavorites from "../favorite/ShowFavorites";
import MiddleComponents from "../FolderComponents/MiddleComponents";
import RestoreNoteCompo from "../MainComponents/RestoreNoteCompo";
import SelectNoteCompo from "../MainComponents/SelectNoteCompo";

function ArchiveNoteIdRoute() {
    const { noteId, folderId, folderName } = useParams();
    const { pathname } = useLocation();
    const section = pathname.split('/')[1];

    const getMiddleComponent = () => {
        if (folderId && folderName) return <MiddleComponents />;
        if (section === 'Archived') return <ShowArchive />;
        if (section === 'Deleted') return <ShowDeletedNote />;
        if (section === 'favorites') return <ShowFavorites />;
        return null;
    };

    const getRightComponent = () => {
        if (!noteId) return <SelectNoteCompo />;
        if (section === 'Archived' || section === 'favorites') return <ShowNotesContent />;
        if (section === 'Deleted') return <RestoreNoteCompo />;
        if (folderId && folderName) return <ShowNotesContent />;
        return null;
    };

    return (
        <div className="flex w-full h-screen border border-none">
            <div className="w-6/28 h-screen py-7">
                <LeftContainer />
            </div>

            <div className="w-7/28 bg-MiddleCompo h-screen px-5 overflow-y-auto scrollbar-hide">
                {getMiddleComponent()}
            </div>

            <div className="w-15/28 h-screen overflow-y-auto px-5">
                {getRightComponent()}
            </div>
        </div>
    );
}

export default ArchiveNoteIdRoute;
