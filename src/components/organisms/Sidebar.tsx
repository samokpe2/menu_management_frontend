import React from 'react';
import SidebarToggle from '../molecules/SidebarToggle';
import logo from '../../assets/logo.svg'
import SidebarItem from '../molecules/SidebarItem';
import folder from '../../assets/folder.svg'
import submenu1 from '../../assets/submenu1.svg'
import submenu2 from '../../assets/submenu2.svg'
import cozy from '../../assets/cozy.svg'
import folder_light from '../../assets/folder-light.svg'


interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => (
    <>
     <div className={` ${isOpen ? 'w-[300px]' : 'w-[0px]'} transition-width duration-300 p-2 py-4  h-[200vh]`}>
    <div className='bg-[#101828] h-full rounded-[24px]'>
        <div className="flex justify-between items-center p-4">
        <img src={logo}/>
        <SidebarToggle isOpen={isOpen} onToggle={onToggle} />
        </div>
        {isOpen && (
        <nav className="flex flex-col p-4 space-y-2">
            <div className="bg-[#1D2939] p-2 rounded-[16px]">
                <SidebarItem label="Systems" textColor="#FFFFFF" backgroundColor='transparent' img={folder} />
                <SidebarItem label="Systems Code" textColor="#667085" backgroundColor='transparent' img={submenu1} />
                <SidebarItem label="Properties" textColor="#667085" backgroundColor='transparent' img={cozy} />
                <SidebarItem label="Menus" textColor="#101828" backgroundColor='#9FF443' img={submenu2} />
                <SidebarItem label="API List" textColor="#667085" backgroundColor='transparent' img={cozy} />
            </div>
            <SidebarItem label="User & Group" textColor="#667085" backgroundColor='transparent' img={folder_light} />
            <SidebarItem label="Competition" textColor="#667085" backgroundColor='transparent' img={folder_light} />
        </nav>
        )}
    </div>
  </div>
  
    </>
 

);

export default Sidebar;
