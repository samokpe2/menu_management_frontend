import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import MenuList from '../molecules/MenuList';
import { useMenus, useMenuItems, useAddMenu, MenuItem as MenuItemType } from '../../hooks/apiHooks';
import AddMenuItemForm from './AddMenuItemForm';
import Label from '../atoms/Label';
import Modal from '../molecules/Modal';
import Input from '../atoms/Input';
import { toast } from 'react-toastify';
import UpdateMenuItemForm from './UpdateMenuItemForm';

const MenusSection: React.FC = () => {
  const { data: menus, refetch: refetchMenus } = useMenus();
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const { data: menuItems = [] } = useMenuItems(selectedMenu);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newMenuName, setNewMenuName] = useState<string>('');
  const [item_name, setItemName] = useState<string>('');

  const [addMenuItemState, setAddMenuItemState] = useState<{
    isOpen: boolean;
    menu_id: string;
    parent_id: string | null;
    position: number;
  }>({
    isOpen: false,
    menu_id: '',
    parent_id: null,
    position: 0,
  });

  const [updateMenuItemState, setUpdateMenuItemState] = useState<{
    isOpen: boolean;
    id: string | null;
    menu_id: string;
    parent_id: string | null;
    parent_name: string | null;
    position: number;
    item_name: string;
  }>({
    isOpen: false,
    id: null,
    menu_id: '',
    parent_id: null,
    position: 0,
    parent_name: null,
    item_name: ""
  });

  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const addMenuMutation = useAddMenu();

  // Set the selected menu to the first menu when the component mounts
  useEffect(() => {
    if (menus && menus.length > 0) {
      setSelectedMenu(menus[0].id); // Set to the ID of the first menu
    }
  }, [menus]);


  const handleToggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandCollapse = (expand: boolean) => {
    const newExpandedState: { [key: string]: boolean } = {};
    menuItems.forEach((item) => {
      newExpandedState[item.id] = expand;
    });
    setExpandedItems(newExpandedState);
  };

  const handleCreateMenu = async () => {
    if (!newMenuName.trim()) {
      toast.error('Please enter a menu name');
      return;
    }
    // Logic for creating a menu
    try {
        await addMenuMutation.mutateAsync({ name: newMenuName });
        toast.success('Menu created successfully');
        setIsModalOpen(false);
        setNewMenuName('');
        refetchMenus(); // Refresh the menus list
      } catch (error) {
        toast.error('Failed to create menu. Please try again.');
      }
  };

  const handleAddMenuItem = (item: MenuItemType) => {
    setUpdateMenuItemState({
      isOpen: false,
      id: item.id,
      menu_id: '',
      parent_id: null,
      position: 0,
      parent_name: null,
      item_name: ""
    });

    setAddMenuItemState({
      isOpen: true,
      menu_id: selectedMenu,
      parent_id: item.id,
      position: item.position + 1,
    });

    setItemName(item.name)
  };

  const handleUpdateMenuItem = (item: MenuItemType) => {
    setAddMenuItemState({
      isOpen: false,
      menu_id: '',
      parent_id: null,
      position: 0,
    });

    setUpdateMenuItemState({
      isOpen: true,
      id: item.id,
      menu_id: selectedMenu,
      parent_id: item.id,
      position: item.position,
      parent_name: item.parent_id,
      item_name: item.name
    });

    setItemName(item.name)
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col mt-4">
        <Label>Menu</Label>
        <Select
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          options={menus?.map((menu) => ({ label: menu.name, value: menu.id })) || []}
          className="max-md:w-full w-[50%] mb-5"
        />
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-[50%]">
            <Button
              onClick={() => handleExpandCollapse(true)}
              backgroundColor='#1D2939'
              className='text-white mr-2 px-[32px] py-[12px]'
              disabled={false}
            >
              Expand All
            </Button>
            <Button
              onClick={() => handleExpandCollapse(false)}
              backgroundColor='transparent'
              className='border-[#D0D5DD] border-[1px] px-[32px] py-[12px]'
              disabled={false}
            >
              Collapse All
            </Button>
            <MenuList items={menuItems} onAdd={handleAddMenuItem} expandedItems={expandedItems} onToggleExpand={handleToggleExpand}  onUpdate={handleUpdateMenuItem}/>
            <Button
              onClick={() => setIsModalOpen(true)}
              backgroundColor='#253BFF'
              className='text-white mr-2 px-[32px] py-[14px] mt-4'
              disabled={false}
            >
              Create Menu
            </Button>
          </div>
          <div className="lg:w-[50%] mt-4 lg:mt-0">
            {addMenuItemState.isOpen && (
              <AddMenuItemForm
                menu_id={addMenuItemState.menu_id}
                parent_id={addMenuItemState.parent_id}
                position={addMenuItemState.position}
                item_name={item_name}
                onClose={() => setAddMenuItemState({ isOpen: false, menu_id: '', parent_id: null, position: 0 })}
              />
            )}

          {updateMenuItemState.isOpen && (
              <UpdateMenuItemForm
                id={updateMenuItemState.id}
                menu_id={updateMenuItemState.menu_id}
                parent_id={updateMenuItemState.parent_id}
                position={updateMenuItemState.position}
                item_name={updateMenuItemState.item_name}
                parent_name={updateMenuItemState.parent_name}
                onClose={() => setAddMenuItemState({ isOpen: false, menu_id: '', parent_id: null, position: 0 })}
              />
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Create New Menu</h2>
        <Label>Menu Name</Label>
        <Input
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
            className='w-full mb-4'
        />
        <Button
            onClick={handleCreateMenu}
            backgroundColor='#253BFF'
            className='text-white mt-4 w-full px-[32px] py-[14px]'
            disabled={addMenuMutation.isPending}
        >
            {addMenuMutation.isPending ? 'Creating...' : 'Create Menu'}
        </Button>
        {addMenuMutation.isError && (
            <p className="text-red-500 mt-2">Error creating menu. Please try again.</p>
        )}
      </Modal>
    </div>
  );
};

export default MenusSection;
