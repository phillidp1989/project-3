import React, { useState, useEffect, useContext } from 'react';
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
import API from '../../utils/API';
import { UserContext } from '../../context/UserContext';
import SuccessDialog from '../../components/SuccessDialog';

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

export default function Index(props) {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { currentPost } = props.location;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    summary: '',
    description: '',
    category: [
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
    technologies: [],
    posterId: ''
  });

  useEffect(() => {
    if (user && currentPost && user._id === currentPost.posterId) {
      setPostData((postData) => {
        const categories = currentPost.category;
        currentPost.category = postData.category.map(({ name, checked }) => ({
          name,
          checked: categories.includes(name)
        }));
        console.log(currentPost);
        return currentPost;
      });
    }
  }, [currentPost, user]);

  const [err, setErr] = useState({
    title: false,
    summary: false,
    category: false,
    categoryOverLimit: false,
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
    const { category: categories } = postData;
    const i = categories.findIndex((obj) => obj.name === name);
    const updatedCategories = [...categories];
    updatedCategories[i] = { name, checked };
    setPostData({
      ...postData,
      category: updatedCategories
    });

    //Checking for errors
    const chosenCategoryCount = updatedCategories.filter(
      ({ checked }) => checked
    ).length;
    setErr((e) => ({
      ...e,
      category: chosenCategoryCount === 0,
      categoryOverLimit: chosenCategoryCount > 2
    }));
  };

  const postForm = async () => {
    // Checking if err state is true and returning key if so
    const errCheck = (err, { title, summary, description, category }) => {
      // These checks need to be separate so the inputs don't flag errors on page load
      // Check if user interacted with form at all
      if (title.trim() + summary.trim() + description.trim() === '')
        return 'something';

      // Making sure user hasn't interacted with a single value
      if (title.trim().length === 0) return 'title';
      if (summary.trim().length === 0) return 'summary';
      if (description.trim().length === 0) return 'description';
      const chosenCategoryCount = category.filter(({ checked }) => checked)
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
    const category = postData.category
      .filter(({ checked }) => checked)
      .map(({ name }) => name);

    const newPost = { ...postData, category, posterId: user._id };
    const editedPost = { ...postData, category, posterId: user._id, _id: currentPost };

    if (currentPost) {
      try {
        await API.updatePost(editedPost);
        setDialogOpen(true);
      } catch (err) {
        console.error('ERROR - index.js - postForm', err);
      }
    } else {
      try {
        await API.savePost(newPost);
        setDialogOpen(true);
      } catch (err) {
        console.error('ERROR - index.js - postForm', err);
      }

    }
  };

  const inputErrCheck = (e) => {
    const { name, value } = e.target;
    // Setting error state if required input changes to empty
    setErr({ ...err, [name]: value.trim().length === 0 });
  };

  return (
    <>
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
      <SuccessDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        returnLink={''}
        returnTo="Return to homepage"
        successText="You have successfully added your idea to the App Factory"
      />
    </>
  );
}
