import React from 'react';
import UserPosts from '../../components/userPosts';
import { Grid } from '@material-ui/core';
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
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.root}
    >
      <UserPosts />
    </Grid>
  );
}
