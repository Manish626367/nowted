

import { useState, useEffect, useRef } from "react";

interface EditNoteProps {
  id: string;
  name: string;
  onSave: (id: string, newTitle: string) => void;
}

function EditNote({ id, name, onSave }: EditNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(name);

  const inputRef = useRef(name);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title.trim() && title !== inputRef.current) {
        onSave(id, title);
        inputRef.current = title; 
      }
    }, 2000); 

    return () => clearTimeout(timer); 
  }, [title, id, onSave]);

  useEffect(()=>{
    setTitle(name)
    inputRef.current = name;
  },[name])

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setIsEditing(false)}
          className="border-b border-gray-400 font-semibold bg-transparent text-white outline-none text-3xl"
        />
      ) : (
        <p
          className="text-3xl font-semibold cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {name}
       
        </p>
      )}
    </div>
  );
}

export default EditNote;
