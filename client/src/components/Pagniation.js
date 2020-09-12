import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  },
  ul: {
    placeContent: "center"
  }
}));

export default function BasicPagination({
  postsPerPage,
  totalPosts,
  handleChange
}) {
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.root}>
      <Pagination count={pageNumbers.length} onChange={handleChange} color="secondary" classes={classes} />
    </div>
  );
}
