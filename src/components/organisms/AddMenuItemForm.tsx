import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
import { useAddMenuItem } from '../../hooks/apiHooks';
import { toast } from 'react-toastify';

interface AddMenuItemFormProps {
  menu_id: string;
  parent_id: string | null;
  position: number;
  item_name: string;
  onClose: () => void;
}

const AddMenuItemForm: React.FC<AddMenuItemFormProps> = ({ menu_id, parent_id, position, onClose, item_name }) => {
  const [name, setName] = useState<string>('');
  const addMenuItemMutation = useAddMenuItem(menu_id);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }

    try {
      await addMenuItemMutation.mutateAsync({
        menu_id,
        parent_id,
        position,
        name,
      });
      toast.success('Menu item added successfully');
      onClose(); // Close the form after saving
    } catch (error) {
      toast.error('Failed to add menu item. Please try again.');
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-2">
      <Label>MenuID</Label>
      <Input value={menu_id} disabled className='max-md:w-[100%] md:w-[100%]' />
      <Label>Parent ID</Label>
      <Input value={item_name} disabled className='max-md:w-[100%] md:w-[50%]' />
      <Label>Depth</Label>
      <Input value={position.toString()} disabled className='max-md:w-[100%] md:w-[50%]' />
      <Label>Name</Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='max-md:w-[100%] md:w-[50%]'
      />
      <Button
        onClick={handleSave}
        backgroundColor='#253BFF'
        className='text-white mt-2 px-[32px] py-[12px] w-[50%]'
        disabled={false}
      >
        Save
      </Button>
    </div>
  );
};

export default AddMenuItemForm;
