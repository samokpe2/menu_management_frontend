import React, { useState, useEffect } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";
import { useUpdateMenuItem, useDeleteMenuItem } from "../../hooks/apiHooks";
import { toast } from "react-toastify";

interface UpdateMenuItemFormProps {
  id: string | null;
  menu_id: string;
  parent_id: string | null;
  position: number;
  parent_name: string | null;
  item_name: string;
  onClose: () => void;
}

const UpdateMenuItemForm: React.FC<UpdateMenuItemFormProps> = ({
  id,
  menu_id,
  parent_id,
  position,
  onClose,
  item_name,
  parent_name,
}) => {
  const [name, setName] = useState<string>(item_name);
  const updateMenuItemMutation = useUpdateMenuItem(id, menu_id);
  const deleteMenuItemMutation = useDeleteMenuItem(id, menu_id);

  useEffect(() => {
    setName(item_name);
  }, [item_name]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    try {
      await updateMenuItemMutation.mutateAsync({
        name,
      });
      toast.success("Menu item updated successfully");
      onClose(); // Close the form after saving
    } catch (error) {
      toast.error("Failed to update menu item. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMenuItemMutation.mutateAsync();
      toast.success("Menu item deleted successfully");
      onClose(); // Close the form after deletion
    } catch (error) {
      toast.error("Failed to delete menu item. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col p-4 space-y-2">
         {position !== 0  && (
      <Button
        onClick={handleDelete}
        backgroundColor="red"
        className="absolute top-0 right-0 text-white px-3 py-1"
        disabled={deleteMenuItemMutation.isPending}
      >
        {deleteMenuItemMutation.isPending ? "Deleting..." : "Delete"}
      </Button>
         )}
      <Label>Menu ID</Label>
      <Input value={menu_id} disabled className="max-md:w-[100%] md:w-[100%]" />

      <Label>Parent ID</Label>
      <Input
        value={parent_name}
        disabled
        className="max-md:w-[100%] md:w-[50%]"
      />

      <Label>Depth</Label>
      <Input
        value={position.toString()}
        disabled
        className="max-md:w-[100%] md:w-[50%]"
      />

      <Label>Name</Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="max-md:w-[100%] md:w-[50%]"
      />

      <Button
        onClick={handleSave}
        backgroundColor="#253BFF"
        className="text-white mt-2 px-[32px] py-[12px] w-[50%]"
        disabled={updateMenuItemMutation.isPending}
      >
        {updateMenuItemMutation.isPending ? "Saving..." : "Update"}
      </Button>

      {updateMenuItemMutation.isError && (
        <p className="text-red-500 mt-2">
          Error saving menu item. Please try again.
        </p>
      )}

      {deleteMenuItemMutation.isError && (
        <p className="text-red-500 mt-2">
          Error deleting menu item. Please try again.
        </p>
      )}
    </div>
  );
};

export default UpdateMenuItemForm;
