import React from 'react';
import PostResults from '../../components/PostResults';
import './style.css';
import { Grid, Zoom, Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function Index() {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <PostResults />
      </Grid>
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
    </>
  );
}
