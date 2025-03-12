

import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

interface Note {
    title: string;
    content: string;
    createdAt: string;
    id: string;
    folderId: string | undefined;
    folderName: string | undefined;
}

function ShowRecents() {
    const { noteId } = useParams();
    const [getNote, setGetNote] = useState<Note | null>(null);


    useEffect(() => {
        
        async function fetchNote() {
            try {
                const response = await axios.get(
                    `https://nowted-server.remotestate.com/notes/${noteId}`
                );
                setGetNote(response.data.note);
                console.log(response.data.note);
                
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        }

        fetchNote();
    }, [noteId]);

    if (!getNote) {
        return <p className="text-center text-gray-400">Loading...</p>;
    }

    const { id, title, content, createdAt } = getNote;

    return (
        <div className="py-8">
        <NavLink
            key={id}
            to={`/Recents/${title}/${id}`}
            className="block" 
        >
            <div className="bg-createNew p-6 rounded-lg shadow-md text-white flex flex-col gap-4">
                <p className="text-xl font-semibold">{title}</p>

                <div className="flex items-center justify-between text-gray-400 text-md w-full">
                    {/* <p>{lastdate.slice(0, 10)}</p> */}
                    <p>{createdAt.slice(0,10)}</p>
                    <p className="truncate overflow-hidden whitespace-nowrap text-ellipsis flex-1 ml-3">
                        {content}
                    </p>
                </div>
            </div>
        </NavLink>
        </div>
    );
}

export default ShowRecents;
