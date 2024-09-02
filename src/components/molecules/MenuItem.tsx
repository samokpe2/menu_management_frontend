import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../../hooks/apiHooks';
import ChevronIcon from '../atoms/ChevronIcon';
import circle_plus from '../../assets/circle-plus.svg'

interface MenuItemProps {
  item: MenuItemType;
  onAdd: () => void;
  onUpdate: () => void;
  onToggleExpand: () => void;
  isExpanded: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd, onUpdate, onToggleExpand, isExpanded}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div 
      className="flex items-center relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left line (only if there's a parent) */}
      {item.parent_id && (
        <div 
          className={`w-5 h-px bg-[#98A2B3] mt-4 ml-[-1.7rem] mr-2`}
        ></div>
      )}

      {/* Chevron Icon */}
      {item.children && item.children.length > 0 && (
        <div onClick={onToggleExpand} className="cursor-pointer mr-2">
          <ChevronIcon isExpanded={isExpanded} />
        </div>
      )}

      {/* Menu Item Name */}
      <span className="font-[400] text-[14px] leading-[14px] mt-4" onClick={onUpdate}>
        {item.name}
      </span>

      {/* Add Button (aligned beside the item name) */}
      {isHovered && (
        <button
          onClick={onAdd}
          className="ml-2 relative top-2 w-[20px] h-[20px]"
        >
          <img src={circle_plus} />
        </button>
      )}
    </div>
  );
};

export default MenuItem;
