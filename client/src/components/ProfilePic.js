import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Avatar, Badge } from '@material-ui/core';
import { UserContext } from '../context/UserContext';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none !important',
    color: 'black'
  },
  pointer: {
    cursor: 'pointer'
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))(Badge);

export default function ProfilePic({ handleMenu }) {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  return (
    <div>
      <StyledBadge
        className={classes.pointer}
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        variant="dot"
        onClick={handleMenu}
      >
        <Avatar alt={user.displayName} src={user.avatar || 'Open Menu'} />
      </StyledBadge>
    </div>
  );
}
