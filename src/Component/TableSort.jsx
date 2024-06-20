import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

/**
 * SortDropdown component provides a dropdown menu with sorting options.
 *
 * @component
 * @example
 * const handleSort = (order) => {
 *   console.log(`Sorting in ${order} order`);
 * };
 * return <SortDropdown onSort={handleSort} />;
 *
 * @param {Object} props - Component properties
 * @param {function(string): void} props.onSort - Callback function to handle sorting order change.
 *
 * @returns {JSX.Element} A React component that renders a sorting dropdown menu.
 */
export default function SortDropdown({ onSort }) {
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * Handles the click event to open the dropdown menu.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the dropdown menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles the sort order selection.
   *
   * @param {string} order - The sort order, either 'asc' or 'desc'.
   */
  const handleSort = (order) => {
    onSort(order);
    handleClose();
  };

  return (
    <div>
      <IconButton size='small' onClick={handleClick}>
        <SortIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSort('asc')}>Sort ASC</MenuItem>
        <MenuItem onClick={() => handleSort('desc')}>Sort DESC</MenuItem>
      </Menu>
    </div>
  );
}
