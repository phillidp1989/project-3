import React, { useState, useEffect } from 'react';
import PostSolution from './PostSolution';
import { Divider, Grid, Typography } from '@material-ui/core';
import API from '../utils/API';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  solutionTitle: {
    textAlign: 'center'
  }
}));

export default function PostSolutionsResults({ postId }) {
  const classes = useStyles();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const getPostSolutions = async () => {
      try {
        const { data } = await API.getPostSolutions(postId);

        setSolutions(data.solutions);
        console.log(data.solutions);
      } catch (err) {
        console.error('ERROR - UserPosts() - getPostSolutions', err);
      }
    };
    getPostSolutions();
  }, []);

  return (
    <>
      {solutions.length > 0 ? <><Typography variant='h3' className={classes.solutionTitle}>Solutions</Typography>
        <Divider variant="middle" /> </> : null}
      <Grid container justify="center" className={classes.root}>
        {solutions.map((solution) => (
          <Grid key={solution.repoName} item xs={10}>
            <PostSolution
              id={solution._id}
              title={solution.repoName}
              summary={solution.repoDescription}
              score={solution.score}
              deployed_link={solution.deployedLink}
              repo_link={solution.repoLink}
              likedBy={solution.likedBy}
              comments={solution.comments}
              developerId={solution.developerId}
              date={solution.createdAt}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
