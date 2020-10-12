import React, { useState, useLayoutEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, red, blue, orange, purple } from '@material-ui/core/colors';
import {
  Container,
  Paper,
  Typography,
  Zoom,
  Fab,
  Grow,
  Grid,
  Chip,
  Button
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PostSolutionsResults from '../../components/PostSolutionsResults';

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
  chip: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: '#ffffffde',
    fontWeight: 600
  },
  description: {
    '& h1': { ...theme.typography.h4 },
    '& h2': { ...theme.typography.h5 },
    '& h3': { ...theme.typography.h6 },
    '& p': { ...theme.typography.body1 }
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
  },
  postSolutions: {
    width: '100%',
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ctaLink: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  loadingContainer: {
    justifyContent: 'center',
    marginTop: 32
  }
}));

export default function Index() {
  const classes = useStyles();
  const { id: _id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState(false)
  const [postData, setPostData] = useState({
    _id: '',
    title: '',
    summary: '',
    description: '',
    category: [],
    technologies: [],
    score: 0,
    activeDevelopers: [],
    solutions: [],
    likedBy: [],
    updatedAt: '',
    posterId: ''
  });


  useLayoutEffect(() => {
    const { pathname } = window.location;
    const getPost = async () => {
      setIsLoaded(false);
      const { data } = await axios.get(
        `https://app-factory-api.herokuapp.com/api${pathname}`
      );
      setIsLoaded(true);
      setPostData({ ...data, _id });
    };
    getPost();
    return () => { };
  }, [_id]);

  const { title, summary, description, category, technologies } = postData;

  const categoryColour = (category) => {
    switch (category) {
      case 'Business':
        return red[500];
      case 'Design':
        return green[500];
      case 'Gaming':
        return blue[500];
      case 'Journalism':
        return orange[500];
      case 'Marketing':
        return purple[500];
      default:
        return blue[600];
    }
  };

  //description has been sanitised in backend prior to saving
  function createMarkup() {
    return { __html: description };
  }

  return (
    <>
      {!isLoaded ?
        <Grid container className={classes.loadingContainer}><CircularProgress color='primary' /></Grid> :
        <>
          <Grow in={true} style={{ transitionDelay: '300ms' }}>
            <Container component={Paper} className={classes.root}>


              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h2">{title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{summary}</Typography>
                </Grid>
                <Grid item xs={12}>
                  {category.map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      style={{ backgroundColor: categoryColour(category) }}
                      className={classes.chip}
                    />
                  ))}

                  <br />

                  {technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      style={{ backgroundColor: categoryColour(category) }}
                      className={classes.chip}
                    />
                  ))}
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={classes.description}
                  dangerouslySetInnerHTML={createMarkup()} // Sanitised
                ></Grid>
                <Grid item xs={12} className={classes.ctaLink}>
                  {user && user.isDeveloper && (
                    <Button
                      component={Link}
                      color="secondary"
                      to={`/posts/solution/${postData._id}`}
                      variant="contained"
                      className={classes.ctaLink}
                    >
                      Build It!
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Grow>
          <PostSolutionsResults postId={_id} className={classes.postSolutions} />
          {user && user._id === postData.posterId && (
            <Zoom in={true}>
              <Fab
                component={Link}
                to={{
                  pathname: `/posts/edit/${postData._id}`,
                  currentPost: postData
                }}
                className={classes.fab}
                color="secondary"
                aria-label="Edit Post"
              >
                <EditIcon />
              </Fab>
            </Zoom>
          )}
        </>
      }
    </>
  );
}
