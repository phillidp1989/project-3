import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid, NativeSelect } from '@material-ui/core';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '70%',
    [theme.breakpoints.up(780)]: {
      minWidth: '30%'
    }
  },
  root: {
    textAlign: 'center',
    marginBottom: 30,
    justifyContent: 'space-evenly'
  }
}));

export default function SimpleMenu({ posts, setActivePosts }) {
  const classes = useStyles();

  const handleChange = (event) => {

    if (event.target.value === 'No. of likes') {
      const likedPosts = [...posts].sort((a, b) => b.score - a.score);
      setActivePosts(likedPosts);
    } else if (event.target.value === 'Newest to oldest') {
      const datePosts = [...posts].sort((a, b) => {
        return a.createdAt < b.createdAt
          ? 1
          : a.createdAt > b.createdAt
            ? -1
            : 0;
      });
      setActivePosts(datePosts);
    } else if (event.target.value === 'Most active developers') {
      const mostActiveDevelopers = [...posts].sort((a, b) => b.activeDevelopers.length - a.activeDevelopers.length);
      setActivePosts(mostActiveDevelopers);
    }
  };


  const onTagsChange = (e, value) => {
    if (value === "") {
      setActivePosts(posts);
    } else {
      const filteredPosts = posts.filter((post) => {
        return post.title.toLowerCase().includes(value.toLowerCase());
      });
      setActivePosts(filteredPosts);
    }
  };

  return (
    <Grid container className={classes.root}>
      <SearchBar posts={posts} onTagsChange={onTagsChange} />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Sort posts
        </InputLabel>
        <NativeSelect
          defaultValue={'Newest to oldest'}
          inputProps={{
            name: 'sort',
            id: 'uncontrolled-native',
          }}
          onChange={handleChange}
        >
          <option value={'Newest to oldest'}>Newest to oldest</option>
          <option value={'No. of likes'}>No. of likes</option>
          <option value={'Most active developers'}>Most active developers</option>
        </NativeSelect>
      </FormControl>
    </Grid>
  );
}
