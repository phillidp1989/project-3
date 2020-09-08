import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { Grid } from '@material-ui/core';
import BasicPagination from './Pagniation';
import API from '../utils/API';

export default function PostResults() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const results = await API.allPosts();
        console.log(results);
        setPosts(results.data);
      } catch (err) {
        console.error('ERROR - PostResults.js - fetchPosts', err);
      }
    }
    fetchPosts();
  }, [currentPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      {currentPosts.map((post) => (
        <Grid key={post.title} item xs={10}>
          <PostCard
            id={post._id}
            title={post.title}
            description={post.summary}
            details={post.description}
            score={post.score}
            likedBy={post.likedBy}
          />
        </Grid>
      ))}
      <Grid item xs={10} >
        <BasicPagination postsPerPage={postsPerPage} totalPosts={posts.length} handleChange={handleChange} />
      </Grid>
    </React.Fragment>
  );
}
