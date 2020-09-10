import React, { useState, useEffect, useContext } from 'react';
import PostCard from './PostCard';
import { Grid } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import API from '../utils/API';

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const { user, isLoaded } = useContext(UserContext);

  useEffect(() => {
    const getUserPosts = async () => {
      console.log(user);
      try {
        if (user) {
          const { data } = await API.getUserPosts(user._id);
          setPosts(data);
        }
      } catch (err) {
        console.error('ERROR - UserPosts() - getUserPosts', err);
      }
    };
    getUserPosts();
  }, [isLoaded]);

  return (
    <React.Fragment>
      {posts.map((post) => (
        <Grid item xs={10} key={post.title}>
          <PostCard
            id={post._id}
            title={post.title}
            date={post.createdAt}
            category={post.category}
            summary={post.summary}
            description={post.description}
            score={post.score}
            likedBy={post.likedBy}
          />
        </Grid>
      ))}
    </React.Fragment>
  );
}
