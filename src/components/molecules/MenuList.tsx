import React from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '../../hooks/apiHooks';

interface MenuListProps {
  items: MenuItemType[];
  onAdd: (item: MenuItemType) => void;
  onUpdate: (item: MenuItemType) => void;
  expandedItems: { [key: string]: boolean };
  onToggleExpand: (id: string) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, onAdd, onUpdate, expandedItems, onToggleExpand }) => {
  const buildMenuTree = (items: MenuItemType[]): MenuItemType[] => {
    const map: { [key: string]: MenuItemType } = {};
    const roots: MenuItemType[] = [];

    // Initialize the map with each item and an empty children array
    items.forEach(item => {
      map[item.id] = { ...item, children: [] }; // Initialize children array
    });

    // Build the tree structure
    items.forEach(item => {
      if (item.parent_id) {
        // If item has a parent, push it into the parent's children array
        map[item.parent_id]?.children?.push(map[item.id]);
      } else {
        // If item is a root, push it into the roots array
        roots.push(map[item.id]);
      }
    });

    return roots; // Return the top-level items
  };

  const countExpansionsToLowestBranch = (item: MenuItemType): number => {
    if (!item.children || item.children.length === 0) {
      return 0;
    }

    const lastChild = item.children[item.children.length - 1];
    if (expandedItems[lastChild.id]) {
      return 1 + countExpansionsToLowestBranch(lastChild);
    } else {
      return 1;
    }
  };

  const menuTree = buildMenuTree(items);

  const renderItems = (items: MenuItemType[], parentExpanded: boolean = false) => {
    return items.map((item, index) => {
    const isLastChild = index === items.length - 1;
    let expansionCount = isLastChild ? countExpansionsToLowestBranch(item) : 1;
    expansionCount = expansionCount > 1 ? expansionCount - 1 : 1 

      return (
        <div key={item.id} className="relative pl-5 ">
          {/* Render MenuItem */}
          <MenuItem
            item={item}
            onAdd={() => onAdd(item)}
            onUpdate={() => onUpdate(item)}
            onToggleExpand={() => onToggleExpand(item.id)}
            isExpanded={expandedItems[item.id] || false}
          />

          {/* Render Lines for Children */}
          {expandedItems[item.id] && item.children && item.children.length > 0 && (
            <div className="relative">
              {/* Vertical Line for Child Items */}
              <div
                className={`absolute left-2 bg-[#98A2B3] w-px`}
                style={{
                  height: item.children.length > 1 ? `calc(100% - ${(expansionCount - 1) * 29}px - 7px)` : `24px`, // Shorten the line for the last child
                }}
              ></div>

              {/* Render Child Items */}
              <div className="ml-4">{renderItems(item.children, expandedItems[item.id])}</div>
            </div>
          )}
        </div>
      );
    });
  };

  return <div className="space-y-2">{renderItems(menuTree)}</div>;
};

export default MenuList;
