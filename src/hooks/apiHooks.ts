import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Define types for your data structures
interface Menu {
  id: string;
  name: string;
  // Add more fields as needed
}

export interface MenuItem {
  id: string;
  menu_id: string;
  name: string;
  position: number;
  parent_id: any;
  children?: MenuItem[];
  // Add more fields as needed
}

// API base URL
const API_BASE_URL = 'http://localhost:8000/api'; // Adjust to your Laravel server

// Hook to get all menus
export const useMenus = () => {
  return useQuery<Menu[], Error>({
    queryKey: ['menus'],
    queryFn: () => axios.get<Menu[]>(`${API_BASE_URL}/menus`).then(res => res.data)
  });
};

// Hook to get a single menu by ID
export const useMenu = (id: string) => {
  return useQuery<Menu, Error>({
    queryKey: ['menu', id],
    queryFn: () => axios.get<Menu>(`${API_BASE_URL}/menus/${id}`).then((res) => res.data)
  });
};

// Hook to add a new menu
export const useAddMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<Menu, Error, Omit<Menu, 'id'>>({
    mutationFn: (newMenu: Omit<Menu, 'id'>) => 
      axios.post(`${API_BASE_URL}/menus`, newMenu).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
};

// Hook to update an existing menu
export const useUpdateMenu = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Menu, Error, Partial<Menu>>({
    mutationFn: (updatedMenu: Partial<Menu>) =>
      axios.put(`${API_BASE_URL}/menus/${id}`, updatedMenu).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      queryClient.invalidateQueries({ queryKey: ['menu', id] });
    },
  });
};

// Hook to delete a menu
export const useDeleteMenu = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () => axios.delete(`${API_BASE_URL}/menus/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
};

// Hook to get all items for a specific menu
export const useMenuItems = (menuId: string) => {
  return useQuery<MenuItem[], Error>({
    queryKey: ['menuItems', menuId],
    queryFn: () => axios.get<MenuItem[]>(`${API_BASE_URL}/menus/${menuId}/items`).then((res) => res.data)
  });
};

// Hook to add a new menu item
export const useAddMenuItem = (menuId: string) => {
  const queryClient = useQueryClient();
  return useMutation<MenuItem, Error, Omit<MenuItem, 'id'>>({
    mutationFn: (newItem: Omit<MenuItem, 'id'>) =>
      axios.post(`${API_BASE_URL}/menus/${menuId}/items`, newItem).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems', menuId] });
    },
  });
};

// Hook to update an existing menu item
export const useUpdateMenuItem = (id: string, menuId: string) => {
  const queryClient = useQueryClient();
  return useMutation<MenuItem, Error, Partial<MenuItem>>({
    mutationFn: (updatedItem: Partial<MenuItem>) =>
      axios.put(`${API_BASE_URL}/menu-items/${id}`, updatedItem).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems', menuId] });
    },
  });
};

// Hook to delete a menu item
export const useDeleteMenuItem = (id: string, menuId: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () => axios.delete(`${API_BASE_URL}/menu-items/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems', menuId] });
    },
  });
};