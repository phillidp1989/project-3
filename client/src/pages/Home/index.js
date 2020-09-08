import React from 'react';
import { Zoom, Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function Index() {
  const classes = useStyles();

  return (
    <Zoom in={true}>
      <Fab
        component={Link}
        to="/posts/new"
        className={classes.fab}
        color="secondary"
        aria-label="New Post"
      >
        <AddIcon />
      </Fab>
    </Zoom>
  );
}
