interface SidebarItemProps {
    img: string;
    label: string;
    textColor: string;
    backgroundColor: string;
  }
  
  const SidebarItem: React.FC<SidebarItemProps> = ({ img, label , textColor, backgroundColor}) => {
  
    return (
      <div
        className={`flex items-center p-2 rounded-[16px] mb-2`}
        style={{ backgroundColor: `${backgroundColor}` }} 
      >
        <div className="flex items-center justify-center w-[32px] h-[32px] bg-blue-250 rounded-[50px]">
          <img src={img} />
        </div>
        <span
          className={`ml-1 text-[14px]  leading-[14px] font-[700]`}
          style={{ color: `${textColor}` }} 
        >
          {label}
        </span>
      </div>
    );
  };

  export default SidebarItem