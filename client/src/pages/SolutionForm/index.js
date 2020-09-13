import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Typography,
  Zoom,
  Fab,
  Grow,
  Grid
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Alert, AlertTitle } from '@material-ui/lab';
import { green } from '@material-ui/core/colors';
import GitHubIcon from '@material-ui/icons/GitHub';
import NotesIcon from '@material-ui/icons/Notes';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CommentIcon from '@material-ui/icons/Comment';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext } from '../../context/UserContext';
import API from '../../utils/API';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useParams } from 'react-router-dom';
import SuccessDialog from '../../components/SuccessDialog';

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    },
    width: '100%',
    margin: 0
  },
  grid: {
    width: '100%'
  },
  alertRoot: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  title: {
    textAlign: 'center'
  },
  textRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  link: {
    marginTop: 15,
    width: '90%'
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
  textField: {
    display: 'flex'
  },
  commentButton: {
    marginLeft: 10
  },
  listItem: {
    marginTop: 5,
    border: '1px solid black',
    borderRadius: 5
  },
  bottom: {
    marginBottom: 30
  }
}));

export default function SolutionForm() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  // State
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [comment, setComment] = useState('');
  const [deployedApp, setDeployedApp] = useState('');
  const [deployedBool, setDeployedBool] = useState(false);
  const [solutionData, setSolutionData] = useState({
    comments: [],
    repoName: '',
    repoDescription: '',
    repoLink: '',
    deployedLink: '',
    postId: '',
    developerId: ''
  });

  // useEffect for post data API call
  useEffect(() => {
    const getPosterId = async () => {
      try {
        const { data } = await API.getPost(id);
        setSolutionData({
          ...solutionData,
          postId: id,
          posterId: data.posterId,
          developerId: user._id
        });
      } catch (err) {
        console.error('ERROR - SolutionForm.js - getPosterId', err);
      }
    };
    getPosterId();
  }, [])

  // useEffect for Github API call
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const { data } = await API.github(user.username);
      if (active) {
        setOptions(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  console.log(solutionData);

  // Repo search handler
  const onTagsChange = (e, value) => {
    if (value) {
      setSolutionData({
        ...solutionData,
        repoName: value.name,
        repoDescription: value.description,
        repoLink: value.html_url
      });
    } else {
      setSolutionData({
        ...solutionData,
        repoName: '',
        repoDescription: '',
        repoLink: ''
      });
    }
  };

  // Handle comments text area
  const commentChange = (e) => {
    setComment(e.target.value);
  };

  // Handle comments text area
  const deployedLinkChange = (e) => {
    setDeployedApp(e.target.value);
  };

  // Add comments handler
  const commentSubmit = (e, value) => {
    e.preventDefault();
    setSolutionData({
      ...solutionData,
      comments: [...solutionData.comments, comment]
    });
    setComment('');
  };

  // Add comments handler
  const deployedSubmit = (e, value) => {
    e.preventDefault();
    setSolutionData({
      ...solutionData,
      deployedLink: deployedApp
    });
    setDeployedApp('');
    setDeployedBool(true);
  };

  // Handle comment deletion
  const deleteComment = (e) => {
    const key = e.currentTarget.parentNode.getAttribute('data-key');
    setSolutionData({
      ...solutionData,
      comments: solutionData.comments.filter(
        (comment, index) => index !== parseInt(key)
      )
    });
  };

  // Handles deployed link edit button
  const editLink = () => {
    setDeployedBool(false);
    setDeployedApp(solutionData.deployedLink);
  };

  // Handles solution submit FAB
  const submitSolution = async (e) => {
    e.preventDefault();
    const result = await API.saveSolution(solutionData);
    setDialogOpen(true);
  };


  return (
    <React.Fragment>
      <Grow in={true} style={{ transitionDelay: '300ms' }}>
        <Container component={Paper} className={classes.root}>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={isSmall ? 3 : 10}
            className={classes.containerRoot}
          >
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.title}>
                New Solution
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.grid}>
              <Alert severity="info" icon={<GitHubIcon fontSize="inherit" />}>
                <AlertTitle>Repository</AlertTitle>Link your Github repo to this
                solution
              </Alert>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Autocomplete
                id="asynchronous-autcomplete"
                style={{ width: '90%' }}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                onChange={onTagsChange}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search for a repo"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      )
                    }}
                  />
                )}
              />
              {!solutionData.repoLink ? null : (
                <Alert
                  variant="outlined"
                  severity="success"
                  className={classes.link}
                  icon={<LinkIcon fontSize="inherit" />}
                >
                  Link to repo:{' '}
                  <a
                    href={solutionData.repoLink}
                    alt={solutionData.repoName}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {solutionData.repoLink}
                  </a>
                </Alert>
              )}
              {!solutionData.repoDescription ? null : (
                <Alert
                  variant="outlined"
                  severity="warning"
                  className={classes.link}
                  icon={<DescriptionIcon fontSize="inherit" />}
                >
                  Description: {solutionData.repoDescription}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Alert severity="info" icon={<NotesIcon fontSize="inherit" />}>
                <AlertTitle>Comments</AlertTitle>Add any comments, notes or
                updates on the progress of your solution
              </Alert>
            </Grid>
            <Grid item xs={12} sm={8}>
              <form className={classes.textField} noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="Add comment"
                  style={{ width: '90%' }}
                  onChange={commentChange}
                  value={comment}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.commentButton}
                  onClick={commentSubmit}
                >
                  Add
                </Button>
              </form>
              <div className={classes.demo}>
                <List>
                  {solutionData.comments.map((comment, index) => (
                    <ListItem key={index} className={classes.listItem}>
                      <ListItemAvatar>
                        <Avatar>
                          <CommentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={comment} />
                      <ListItemSecondaryAction data-key={index}>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={deleteComment}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Alert severity="info" icon={<LinkIcon fontSize="inherit" />}>
                <AlertTitle>Deployed Application</AlertTitle>Add a link to the
                deployed application
              </Alert>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.bottom}>
              {deployedBool ? null : (
                <form
                  className={classes.textField}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-basic"
                    label="Link to deployed app"
                    style={{ width: '90%' }}
                    onChange={deployedLinkChange}
                    value={deployedApp}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.commentButton}
                    onClick={deployedSubmit}
                  >
                    Add
                  </Button>
                </form>
              )}
              <div className={classes.demo}>
                <List>
                  {solutionData.deployedLink && deployedBool ? (
                    <ListItem className={classes.listItem}>
                      <ListItemAvatar>
                        <Avatar>
                          <CommentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={solutionData.deployedLink} />
                      <ListItemSecondaryAction>
                        <Button
                          variant="outlined"
                          color="primary"
                          className={classes.commentButton}
                          onClick={editLink}
                        >
                          Edit
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ) : null}
                </List>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <Zoom in={true}>
        <Fab
          onClick={submitSolution}
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
        returnLink={`posts/${id}`}
        returnTo='Return to post'
        successText='You have successfully added your solution to the App Factory'
      />
    </React.Fragment>
  );
}
