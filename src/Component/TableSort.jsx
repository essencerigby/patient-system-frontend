import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

export default function SortDropdown({ onSort }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
