const MainEditButton = ({ icon, text, onClick }: { icon: string; text: string; onClick: () => void }) => {
    
    return (
      <button className="flex gap-5 w-full text-left px-3 py-2 hover:bg-slate-800 cursor-pointer rounded-xl" onClick={(e) => {
        e.stopPropagation();  
        onClick();
    }}>
        <img src={icon} alt={text} className="w-5 h-5" />
        <p>{text}</p>
      </button>
    );
  };

  export default MainEditButton


