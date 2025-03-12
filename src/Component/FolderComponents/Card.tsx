




import { memo } from "react";
import { NavLink } from "react-router-dom";

interface CardProps {
  title: string;
  text: string;
  lastdate: string;
  id: string;
  folderId: string | undefined;
  folderName: string | undefined;
}

const Card = memo(function Card({ title, text, lastdate, id, folderId, folderName }: CardProps) {

  return (  
    <NavLink
      key={id}
      to={`/${folderName}/${folderId}/note/${id}`}
      className="block"
    >
      <div className="bg-createNew p-6 rounded-lg shadow-md text-white flex flex-col gap-4 hover:bg-gray-800">
        <p className="text-xl font-semibold">{title}</p>

        <div className="flex items-center justify-between text-gray-400 text-md w-full">
          <p>{lastdate.slice(0, 10)}</p>
          <p className="truncate overflow-hidden whitespace-nowrap text-ellipsis flex-1 ml-3">
            {text}
          </p>
        </div>
      </div>
    </NavLink>
  );
});

export default Card;

















