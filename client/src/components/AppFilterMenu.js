import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '50%',
    [theme.breakpoints.up(780)]: {
      minWidth: '30%'
    }
  },
  root: {
    textAlign: 'center',
    marginBottom: 30
  }
}));

export default function SimpleMenu({ posts, activePosts, setActivePosts }) {
  const classes = useStyles();
  const [activeSort, setActiveSort] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setActiveSort(event.target.value);

    if (event.target.value === 'No. of likes') {
      const likedPosts = [...posts].sort((a, b) => b.score - a.score);
      setActivePosts(likedPosts);
    } else {
      const datePosts = [...posts].sort((a, b) => {
        return a.createdAt < b.createdAt
          ? 1
          : a.createdAt > b.createdAt
            ? -1
            : 0;
      });
      setActivePosts(datePosts);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Sort app ideas
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={activeSort}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Date posted'}>Date posted</MenuItem>
          <MenuItem value={'No. of likes'}>No. of likes</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}
