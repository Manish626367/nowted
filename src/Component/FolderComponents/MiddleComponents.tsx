

import { useParams } from "react-router-dom";
import Card from "./Card";
import { useEffect, useState, useCallback } from "react"; 
import axios from "axios";
import useFresh from "../../context/ForRefresh";

interface DataTypes {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folderName: string;
  folder: () => void;
}

function MiddleComponents() {
  const { folderId } = useParams();
  const [notes, setNotes] = useState<DataTypes[]>([]);
  const { folderName } = useParams();
  const [FolderName, setFolderName] = useState<string | undefined>();
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const [isLoading, setIsLoading] = useState(false); 

  const { isFresh, isRender } = useFresh();

  const Api = "https://nowted-server.remotestate.com/notes";

  const fetchNotes = useCallback(
    async (currentPage: number) => {
      setIsLoading(true); 

      try {
        const params = {
          archived: false,
          deleted: false,
          folderId: folderId,
          page: currentPage,
          limit: 20, 
        };

        const response = await axios.get(Api, { params });

        if (response.data.notes.length < 20) {
          setHasMore(false);
        }

        setNotes((prevNotes) =>
          currentPage === 1 ? response.data.notes : [...prevNotes, ...response.data.notes]
        );

        if (response.data.notes.length === 0) {
          setFolderName(folderName);
        } else {
          setFolderName(response.data.notes[0].folder.name);
        }
      } catch (error) {
        console.error("Error fetching notes middlecompo:", error);
      } finally {
        setIsLoading(false); 
      }
    },
    [folderId, folderName] 
  );

  
  useEffect(() => {
    setNotes([]); 
    setPage(1);  
    setHasMore(true); 
    fetchNotes(1); 
  }, [fetchNotes, isFresh, isRender]); 

  
  useEffect(() => {
    if (page > 1) {
      fetchNotes(page);
    }
  }, [fetchNotes, page]); 

  const handleLoadMore = () => {
    setPage((prev) => prev + 1); 
  };

  return (
    <>
      <p className="text-2xl font-semibold px-5 py-7">{FolderName}</p>
      <div className="flex flex-col gap-7">
        {isLoading && page === 1 ? (
          <div className="flex justify-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {notes.map((note) => (
              <Card
                title={note.title}
                text={note.preview}
                lastdate={note.updatedAt}
                id={note.id}
                folderId={folderId}
                folderName={folderName}
                key={note.id}
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

export default MiddleComponents;