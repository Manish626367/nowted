

import { useEffect, useState } from "react";
import axios from "axios";
import CardFavorite from "./CardFavorite";
import useFresh from "../../context/ForRefresh";

interface DataTypes {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: () => void;
}

function ShowFavorites() {
  const { isRender } = useFresh();

  const [notes, setNotes] = useState<DataTypes[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async (currentPage: number) => {
    setIsLoading(true); // Show loading only during data fetch

    try {
      const response = await axios.get(
        `https://nowted-server.remotestate.com/notes?favorite=true&deleted=false&limit=20&page=${currentPage}`
      );

      if (response.data.notes.length < 20) {
        setHasMore(false); 
      }
      else{
        setHasMore(true)
      }

      setNotes((prevNotes) =>
        currentPage === 1 ? response.data.notes : [...prevNotes, ...response.data.notes]
      );
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    setNotes([]); 
    setPage(1);   
    fetchNotes(1); 
  }, [isRender]);

  useEffect(() => {
    if (page > 1) {
      fetchNotes(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex flex-col gap-7 py-7">
        <div className="text-2xl font-semibold text-center">
          <p>Favorites</p>
        </div>

        {isLoading && page === 1 ? (
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
                type="favorites"
              />
            ))}

            {hasMore && !isLoading && (
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

export default ShowFavorites;
