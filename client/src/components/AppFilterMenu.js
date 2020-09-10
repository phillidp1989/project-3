import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Menu, MenuItem, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center'
  }
}));

export default function SimpleMenu() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <Button
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Filter Apps
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuItem onClick={handleClose}>Field</MenuItem>
        <MenuItem onClick={handleClose}>Age</MenuItem>
        <MenuItem onClick={handleClose}>User</MenuItem>
      </Menu>
    </Grid>
  );
}
