import axios from "axios";

const DeleteNote = async (noteId: string) => {
  if (!noteId) {
    console.error("No noteId found!");
    return;
  }

  try {
    await axios.delete(`https://nowted-server.remotestate.com/notes/${noteId}`);
    
  } catch (error) {
    console.error("Error in deleting:", error);
  }
};

export default DeleteNote;
