import React from 'react';
import Button from '../atoms/Button';
import toggler_open from '../../assets/toggler-open.svg'
import menu_open from '../../assets/menu_open.svg'

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isOpen, onToggle }) => (
  <span onClick={onToggle}>{isOpen ? <img src={toggler_open} /> :  <img src={menu_open} />}</span>
);

export default SidebarToggle;
