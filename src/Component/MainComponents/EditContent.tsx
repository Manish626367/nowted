

import { useState, useEffect, useRef } from "react";

interface EditContentProps {
  id: string;
  content: string;
  onSave: (id: string, newContent: string) => void;
}

function EditContent({ id, content: initialContent, onSave }: EditContentProps) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(initialContent);

  const initialContentRef = useRef(initialContent); 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (newContent !== initialContentRef.current) {
        onSave(id, newContent);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [id, newContent, onSave]);

  useEffect(() => {
    setNewContent(initialContent); 
    initialContentRef.current = initialContent; 
  }, [initialContent]);

  return (
    <div>
      {isEditing ? (
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          onBlur={() => setIsEditing(false)}
          className="w-full h-screen border border-none border-gray-500 bg-transparent text-white p-2 outline-none rounded-md"
        />
      ) : (
        <p
          className="text-lg cursor-pointer whitespace-pre-wrap"
          onClick={() => setIsEditing(true)}
        >
          {newContent || "Click to add content..."}
        </p>
      )}
    </div>
  );
}

export default EditContent;
