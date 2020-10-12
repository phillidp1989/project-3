import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    minWidth: '70%',
    [theme.breakpoints.up(780)]: {
      minWidth: '30%'
    }
  }
}));

export default function Search({ posts, onTagsChange }) {
  const classes = useStyles();
  return (

    <Autocomplete
      id="combo-box-demo"
      options={posts}
      getOptionLabel={(option) => option.title}
      onInputChange={onTagsChange}
      className={classes.root}
      renderInput={(params) => <TextField {...params} label="Search Post Name" variant="outlined" />}
    />

  );
}