import React, { useState, useEffect, useContext } from 'react';
import PostCard from './PostCard';
import AppFilterMenu from './AppFilterMenu';
import BasicPagination from './Pagniation';
import { Grid } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import API from '../utils/API';

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [activePosts, setActivePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        if (user) {
          const { data } = await API.getUserPosts(user._id);
          setPosts(data);
          if (activePosts.length === 0) {
            setActivePosts(data);
          }
        }
      } catch (err) {
        console.error('ERROR - UserPosts() - getUserPosts', err);
      }
    };
    getUserPosts();
  }, [currentPage]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = activePosts.slice(indexOfFirstPost, indexOfLastPost);

  // Page change handler
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <AppFilterMenu
        posts={posts}
        activePosts={activePosts}
        setActivePosts={setActivePosts}
      />
      {currentPosts.map((post) => (
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
    </React.Fragment>
  );
}
