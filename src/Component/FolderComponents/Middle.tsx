

import { useEffect, useState } from "react";
import axios from "axios";
import CardFavorite from "../favorite/CardFavorite";
import useFresh from "../../context/ForRefresh";

interface DataTypes {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: () => void;
}

interface CombinedNotesProps {
  type: "Archived" | "favorites" | "Deleted";
}

const LIMIT = 20; 

function Middle({ type }: CombinedNotesProps) {
  const { isRender } = useFresh();
  const [notes, setNotes] = useState<DataTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); 

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        let url = "";
        switch (type) {
          case "Archived":
            url = `https://nowted-server.remotestate.com/notes?archived=true&deleted=false&page=${page}&limit=${LIMIT}`;
            break;
          case "favorites":
            url = `https://nowted-server.remotestate.com/notes?favorite=true&deleted=false&page=${page}&limit=${LIMIT}`;
            break;
          case "Deleted":
            url = `https://nowted-server.remotestate.com/notes?deleted=true&page=${page}&limit=${LIMIT}`;
            break;
          default:
            break;
        }

        const response = await axios.get(url);

        if (response.data.notes.length < LIMIT) {
          setHasMore(false); 
        } else {
          setHasMore(true); 
        }

        setNotes((prevNotes) => [...prevNotes, ...response.data.notes]);

      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [type, isRender, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="flex flex-col gap-7 py-7">
        <div className="text-2xl font-semibold text-center">
          <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
        </div>

        {isLoading && notes.length === 0 ? (
          <div className="flex justify-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {notes.map((note) => (
              <CardFavorite
                title={note.title}
                text={note.preview}
                lastdate={note.updatedAt}
                id={note.id}
                key={note.id}
                type={type}
              />
            ))}

            {hasMore && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Middle;
