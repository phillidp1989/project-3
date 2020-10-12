import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BrushIcon from '@material-ui/icons/Brush';
import MicIcon from '@material-ui/icons/Mic';
import { UserContext } from '../context/UserContext';
import Toast from './Toast';
import API from '../utils/API';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
  Grid,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  control: {
    padding: theme.spacing(2)
  },
  score: {
    marginLeft: 5,
    fontSize: 15
  },
  liked: {
    fill: '#52b202'
  },
  editButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  smPoster: {
    marginTop: 20
  }
}));

export default function PostSolution({
  id,
  title,
  category,
  summary,
  repoName,
  repoDescription,
  deployed_link,
  repo_link,
  score,
  likedBy,
  date,
  comments,
  developerId
}) {
  // Material UI card
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, isLoaded } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [likes, setLikes] = useState(score);
  const [liked, setLiked] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [developer, setDeveloper] = useState({
    displayName: '',
    avatar: ''
  })

  // Date parsing
  const postDate = new Date(date);
  const createdAt = postDate.toLocaleString('en-GB', { timeZone: 'UTC' });

  // Icon selection based on category
  let categoryIcon;

  if (category) {
    switch (category[0]) {
      case 'Business':
        categoryIcon = <BusinessCenterIcon />;
        break;
      case 'Marketing':
        categoryIcon = <MonetizationOnIcon />;
        break;
      case 'Design':
        categoryIcon = <BrushIcon />;
        break;
      case 'Journalism':
        categoryIcon = <MicIcon />;
        break;
      case 'Gaming':
        categoryIcon = <SportsEsportsIcon />;
        break;
      default:
        break;
    }
  }

  const handleToast = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (user) {
      if (likedBy.includes(user._id) && isLoaded) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await API.getUser(developerId);
        setDeveloper({
          displayName: data.displayName,
          avatar: data.avatar
        })
      } catch (err) {
        console.error('ERROR - PostCard.js - getUser', err);
      }
    }
    getUser();
  }, [])

  const handleExpandClick = (event) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const likeHandler = async () => {
    if (!user) {
      handleToast();
    } else {
      try {
        setLikes(likes + 1);
        setLiked(true);
        await API.likeDevPost(id, user._id);
      } catch (err) {
        console.error('ERROR - PostCard.js - likeHandler', err);
      }
    }
  };

  const unlikeHandler = async () => {
    try {
      setLikes(likes - 1);
      setLiked(false);
      await API.unlikeDevPost(id, user._id);
    } catch (err) {
      console.error('ERROR - PostCard.js - unlikeHandler', err);
    }
  };

  //------------------------------------

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="post" className={classes.avatar}>
            {categoryIcon}
          </Avatar>
        }
        action={
          !isSmall ? <Alert icon={<Avatar alt={developer.displayName} src={developer.avatar} />} variant="outlined" severity="info"><Typography variant='caption'>Posted by {developer.displayName}<br></br>{createdAt}</Typography></Alert> : null
        }
        key={title}
        title={<Typography variant='h6'>{title}</Typography>}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {summary}
        </Typography>
        {
          isSmall ? <Alert className={classes.smPoster} icon={<Avatar alt={developer.displayName} src={developer.avatar} />} variant="outlined" severity="info"><Typography variant='caption'>Posted by {developer.displayName}<br></br>{createdAt}</Typography></Alert> : null
        }
      </CardContent>
      <CardActions disableSpacing>
        {!isLoaded
          ? null
          : [
            liked && isLoaded ? (
              <IconButton aria-label="thumb down" onClick={unlikeHandler}>
                <ThumbUpAltIcon className={classes.liked} />
                <Typography variant="h6" className={classes.score}>
                  {likes}
                </Typography>
              </IconButton>
            ) : (
                <IconButton aria-label="thumb up" onClick={likeHandler}>
                  <ThumbUpAltIcon />
                  <Typography variant="h6" className={classes.score}>
                    {likes}
                  </Typography>
                </IconButton>
              )
          ]}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Comments:{' '}
            {comments.length === 0 ? (
              'No comments'
            ) : (
                <ul>
                  {comments.map((comment) => (
                    <li>{comment}</li>
                  ))}
                </ul>
              )}
          </Typography>

          <Typography paragraph>
            Deployed Link:{' '}
            {deployed_link ? (
              <a href={deployed_link} target="_blank" rel="noopener noreferrer">
                {deployed_link}
              </a>
            ) : (
                'There is no current Deployed App'
              )}
          </Typography>

          <Typography paragraph>
            Repo Link:{' '}
            <a href={repo_link} target="_blank" rel="noopener noreferrer">
              {repo_link}
            </a>
          </Typography>
          {user && user._id === developerId && (
            <Grid item xs={12} className={classes.editButton}>
              <Button
                component={Link}
                color="primary"
                to={`/solution/edit/${id}`}
                variant="contained"
              >
                Edit
              </Button>
            </Grid>
          )}
        </CardContent>
      </Collapse>
      <Toast open={open} setOpen={setOpen} text={'Login to like a solution!'} />
    </Card>
  );
}
