import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import PostForm from './PostForm';
import ErrorAlert from './ErrorAlert';
import {
  Container,
  Paper,
  Typography,
  Zoom,
  Fab,
  Grow
} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600]
    }
  }
}));

export default function Index() {
  const classes = useStyles();

  const [postData, setPostData] = useState({
    title: '',
    summary: '',
    description: '',
    categories: [
      {
        name: 'Business',
        checked: false
      },
      {
        name: 'Design',
        checked: false
      },
      {
        name: 'Gaming',
        checked: false
      },
      {
        name: 'Journalism',
        checked: false
      },
      {
        name: 'Marketing',
        checked: false
      }
    ],
    technologies: []
  });

  const [err, setErr] = useState({
    title: false,
    summary: false,
    categories: false,
    categoriesOverLimit: false,
    description: false
  });

  const [alert, setAlert] = useState({
    open: false,
    key: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleCategory = (e) => {
    const { name, checked } = e.target;
    const { categories } = postData;
    const i = categories.findIndex((obj) => obj.name === name);
    const updatedCategories = [...categories];
    updatedCategories[i] = { name, checked };
    setPostData({
      ...postData,
      categories: updatedCategories
    });

    //Checking for errors
    const chosenCategoryCount = updatedCategories.filter(
      ({ checked }) => checked
    ).length;
    setErr((e) => ({
      ...e,
      categories: chosenCategoryCount === 0,
      categoriesOverLimit: chosenCategoryCount > 2
    }));
  };

  const postForm = () => {
    // Checking if err state is true and returning key if so
    const errCheck = (err, { title, summary, description, categories }) => {
      // These checks need to be separate so the inputs don't flag errors on page load
      // Check if user interacted with form at all
      if (title + summary + description === '') return 'something';

      // Making sure user hasn't interacted with a single value
      if (title.length === 0) return 'title';
      if (summary.length === 0) return 'summary';
      if (description.length === 0) return 'description';
      const chosenCategoryCount = categories.filter(({ checked }) => checked)
        .length;
      if (chosenCategoryCount === 0) return 'categories';

      // Otherwise check if any of the err state === true
      for (let key in err) {
        if (err.hasOwnProperty(key) && err[key] === true) {
          return key;
        }
      }
      return false;
    };

    const key = errCheck(err, postData);
    if (key !== false) {
      setAlert({ open: true, key });
      return;
    }

    // Filtering categories to array of strings
    const categories = postData.categories
      .filter(({ checked }) => checked)
      .map(({ name }) => name);

    const newPost = { ...postData, categories };
    console.log(newPost);
  };

  const inputErrCheck = (e) => {
    const { name, value } = e.target;
    // Setting error state if required input changes to empty
    setErr({ ...err, [name]: value.length === 0 });
  };

  return (
    <React.Fragment>
      <Grow in={true} style={{ transitionDelay: '300ms' }}>
        <Container component={Paper} className={classes.root}>
          <Typography variant="h4">Enter Your New App Idea:</Typography>
          <br />
          <PostForm
            postData={postData}
            setPostData={setPostData}
            handleChange={handleChange}
            handleCategory={handleCategory}
            inputErrCheck={inputErrCheck}
            err={err}
            setErr={setErr}
          />
        </Container>
      </Grow>
      <ErrorAlert
        isAlertOpen={alert.open}
        setAlert={setAlert}
        errorKey={alert.key}
      />
      <Zoom in={true}>
        <Fab
          onClick={postForm}
          className={classes.fab}
          color="secondary"
          aria-label="New Post"
        >
          <PostAddIcon />
        </Fab>
      </Zoom>
    </React.Fragment>
  );
}
