import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



export default function CenteredGrid() {
  const classes = useStyles();
  const { user, isLoaded } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async id => {
      const results = await axios.get(`/api/posts/user/${id}`);
      console.log(results.data);
      setUserPosts(results.data);
    };
    fetchUserPosts(user._id);
  }, [])


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h1">
              {userPosts.length}
            </Typography>
            <Typography variant="body1">
              Your total number of posts
          </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}


