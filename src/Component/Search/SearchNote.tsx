


import axios from "axios";
import { useState, useEffect, useMemo, useCallback, SetStateAction } from "react";
import { NavLink } from "react-router-dom";

interface Note {
    id: string;
    folderId: string | undefined;
    title: string;
    preview: string;
    updatedAt: string;
    folder: () => void;
}

const SearchNote: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const fetchAllNotes = async () => {
        try {
            const response = await axios.get(
                "https://nowted-server.remotestate.com/notes",
                {
                    params: {
                        archived: false,
                        deleted: false,
                        page: 1,
                        limit:'*',
                    },
                }
            );

            const fetchedNotes = response.data.notes;
            setNotes(fetchedNotes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        fetchAllNotes();
    }, []);

    const filteredNotes = useMemo(() => {
        return notes.filter((note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, notes]);

    const handleSearch = useCallback((e: { target: { value: SetStateAction<string>; }; }) => {
      setSearchTerm(e.target.value);
  }, []);

    return (
        <div className="p-2 flex flex-col gap-1">
            <input
                type="text"
                placeholder="Search notes by title..."
                value={searchTerm}
                onChange={ handleSearch}
                className="w-full border-amber-300 p-2 border rounded-md"
            />

            <div
                className="mt-4 flex flex-col gap-2 max-h-50 overflow-y-auto scrollbar-hide border border-none rounded-md"
            >
                {searchTerm && filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <NavLink
                            to={`/${note.folder.name}/${note.folderId}/note/${note.id}`}
                            key={note.id}
                            className="p-2 border-b hover:bg-gray-100 transition-all"
                        >
                            {note.title}
                        </NavLink>
                    ))
                ) : searchTerm ? (
                    <p className="p-2">No notes found!</p>
                ) : null}
            </div>
        </div>
    );
};

export default SearchNote;
