import React, { useState, useEffect, useContext } from 'react';
import UserSolution from './UserSolution';
import { Grid } from '@material-ui/core';
import API from '../utils/API';
import { UserContext } from '../context/UserContext';

export default function UserSolutionsResults() {
  const [solutions, setSolutions] = useState([]);
  const { user, isLoaded } = useContext(UserContext);

  useEffect(() => {
    const getUserSolutions = async () => {
      try {
        const { data } = await API.getUserSolutions(user._id);
        setSolutions(data);
        console.log(data);
      } catch (err) {
        console.error('ERROR - UserPosts() - getUserSolutions', err);
      }
    };
    getUserSolutions();
  }, []);

  return (
    <React.Fragment>
      {solutions.map((solution) => (
        <Grid key={solution.repoName} item xs={10}>
          <UserSolution
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
    </React.Fragment>
  );
}
