import React, { useState } from 'react';
import Sidebar from '../organisms/Sidebar';
import folder_gray from '../../assets/folder-gray.svg';
import menu_svg from '../../assets/menu.svg';
import MenusSection from '../organisms/MenusSection';
import menu_open from '../../assets/menu_open.svg'

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen w-screen flex-row">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`flex flex-col w-full ${isSidebarOpen ? 'pl-3' : 'pl-0'}`}>
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${isSidebarOpen ? 'hidden' : 'block p-4' }`}
          >
            <img src={menu_open} alt="Toggle Sidebar" />
          </button>
        <header className="flex justify-start items-center p-4 w-full pt-5 mt-4">
          <span className="text-[#101828] font-[500] text-[14px] leading-[14px] ml-1">
            <img src={folder_gray} className='inline-block' alt="Folder" /> 
            <span className='text-[#D0D5DD] ml-1'>/</span> 
            Menus
          </span>
        </header>
        <div className="flex justify-between items-center p-4 w-full mt-4">
          <span>
            <img src={menu_svg} className='inline-block mb-4' alt="Menus" />
            <span className="text-[#101828] font-[800] text-[32px] leading-[40px] ml-3 mt-5">Menus</span>
          </span>
        </div>
        <MenusSection />
      </div>
    </div>
  );
};

export default Layout;
