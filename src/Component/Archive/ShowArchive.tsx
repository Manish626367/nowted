

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

function ShowArchive() {
  const { isRender } = useFresh();

  const [notes, setNotes] = useState<DataTypes[]>([]);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const [isLoading, setIsLoading] = useState(true); 

  const ArchiveApi = `https://nowted-server.remotestate.com/notes?archived=true&deleted=false&limit=20&page=${page}`;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(ArchiveApi);

        if (response.data.notes.length < 20) {
          setHasMore(false); 
        }

        setNotes((prevNotes) => [...prevNotes, ...response.data.notes]);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchNotes();
  }, [ArchiveApi, isRender, page]); 

  const handleLoadMore = () => {
    setPage((prev) => prev + 1); 
  };

  return (
    <>
      <div className="flex flex-col gap-7 py-7">
        <div className="text-2xl font-semibold text-center">
          <p>Archived</p>
        </div>

        {isLoading ? (
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
                type="Archived"
              />
            ))}

            {hasMore && (
              <div className="flex justify-center mt-5">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ShowArchive;



