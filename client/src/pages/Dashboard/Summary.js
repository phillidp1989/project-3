import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext } from '../../context/UserContext';
import API from '../../utils/API';
import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';
import BarChart from './BarChart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async (id) => {
      setPostsLoaded(false);
      try {
        const { data } = await API.dashboardInfo(id);
        setPostsLoaded(true);
        setUserPosts(data);
      } catch (err) {
        console.error('ERROR - Summary.js - fetchUserPosts', err);
      }
    };
    fetchUserPosts(user._id);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {!postsLoaded ? (
              <CircularProgress color='secondary' />
            ) : (
                <>
                  <Typography className={classes.title} variant="h1">
                    {userPosts.totalPosts}
                  </Typography>

                  <Typography variant="body1">
                    Your total number of posts
                </Typography>
                </>
              )}
          </Paper>
        </Grid>
        {!user.isDeveloper ? null : <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {!postsLoaded ? (
              <CircularProgress color='secondary' />
            ) : (
                <>
                  <Typography className={classes.title} variant="h1">
                    {userPosts.totalSolutions}
                  </Typography>
                  <Typography variant="body1">
                    Your total number of solutions
                </Typography>
                </>
              )}
          </Paper>
        </Grid>}
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {!postsLoaded ? (
              <CircularProgress color='secondary' />
            ) : (
                <>
                  <Typography className={classes.title} variant="h1">
                    {userPosts.totalPostLikes}
                  </Typography>
                  <Typography variant="body1">
                    No. of likes on your posts
                </Typography>
                </>
              )}
          </Paper>
        </Grid>
        {!user.isDeveloper ? null : <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {!postsLoaded ? (
              <CircularProgress color='secondary' />
            ) : (
                <>
                  <Typography className={classes.title} variant="h1">
                    {userPosts.totalSolutionLikes}
                  </Typography>
                  <Typography variant="body1">
                    No. of likes on your solutions
                </Typography>
                </>
              )}
          </Paper>
        </Grid>}
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {!postsLoaded ? (
              <CircularProgress color='secondary' />
            ) : (
                <>
                  <PieChart data={userPosts} />
                </>
              )}
          </Paper>
        </Grid>
        {!user.isDeveloper ? null : <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {!postsLoaded ? (
              <CircularProgress color='secondary' />
            ) : (
                <>
                  <DoughnutChart data={userPosts} />
                </>
              )}
          </Paper>
        </Grid>}
        {user.isDeveloper ? null : <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {!postsLoaded ? (
              <CircularProgress color='secondary' />
            ) : (
                <>
                  <BarChart data={userPosts} list={userPosts.categoryList} />
                </>
              )}
          </Paper>
        </Grid>}
      </Grid>
    </div>
  );
}
