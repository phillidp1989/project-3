import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { Grid } from '@material-ui/core';
import AppFilterMenu from './AppFilterMenu';
import BasicPagination from './Pagniation';
import API from '../utils/API';

export default function PostResults() {
  const [posts, setPosts] = useState([]);
  const [activePosts, setActivePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.allPosts();
        const datePosts = [...data].sort((a, b) => {
          return a.createdAt < b.createdAt
            ? 1
            : a.createdAt > b.createdAt
              ? -1
              : 0;
        })
        setPosts(datePosts);
        if (activePosts.length === 0) {
          setActivePosts(datePosts);
        }
      } catch (err) {
        console.error('ERROR - PostResults.js - fetchPosts', err);
      }
    };
    fetchPosts();
  }, [currentPage, activePosts.length]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = activePosts.slice(indexOfFirstPost, indexOfLastPost);

  // Page change handler
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <AppFilterMenu
        posts={posts}
        activePosts={activePosts}
        setActivePosts={setActivePosts}
      />
      {currentPosts.map((post) => (
        <Grid key={post.title} item xs={10}>
          <PostCard
            id={post._id}
            title={post.title}
            date={post.createdAt}
            category={post.category}
            summary={post.summary}
            description={post.description}
            score={post.score}
            likedBy={post.likedBy}
            posterId={post.posterId}
          />
        </Grid>
      ))}
      <Grid item xs={10}>
        <BasicPagination
          postsPerPage={postsPerPage}
          totalPosts={activePosts.length}
          handleChange={handleChange}
        />
      </Grid>
    </>
  );
}
