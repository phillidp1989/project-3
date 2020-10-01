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
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
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
  postsTitle: {
    color: 'white'
  },
  activeDevelopers: {
    marginTop: 20
  },
  avatarGroup: {
    marginTop: 20
  },
  smPoster: {
    marginTop: 20
  },
  posterAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
}));

export default function PostCard({
  id,
  title,
  category,
  summary,
  description,
  score,
  likedBy,
  date,
  posterId
}) {
  // Material UI card
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, isLoaded } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(score);
  const [liked, setLiked] = useState(null);
  const [open, setOpen] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [poster, setPoster] = useState({
    displayName: '',
    avatar: ''
  });

  // Date parsing
  const postDate = new Date(date);
  const createdAt = postDate.toLocaleString('en-GB', { timeZone: 'UTC' });

  // Icon selection based on category
  let categoryIcon;

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
    const getAvatars = async () => {
      try {
        const { data } = await API.getDeveloperAvatars(id);
        setAvatars(data.activeDevelopers);
      } catch (err) {
        console.error('ERROR - PostCard.js - getAvatars', err);
      }
    };
    getAvatars();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await API.getUser(posterId);
        setPoster({
          displayName: data.displayName,
          avatar: data.avatar
        });
      } catch (err) {
        console.error('ERROR - PostCard.js - getUser', err);
      }
    };
    getUser();
  }, []);

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
        await API.likePost(id, user._id);
      } catch (err) {
        console.error('ERROR - PostCard.js - likeHandler', err);
      }
    }
  };

  const unlikeHandler = async () => {
    try {
      setLikes(likes - 1);
      setLiked(false);
      await API.unlikePost(id, user._id);
    } catch (err) {
      console.error('ERROR - PostCard.js - unlikeHandler', err);
    }
  };

  function createMarkup() {
    return { __html: description };
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="post" className={classes.avatar}>
            {categoryIcon}
          </Avatar>
        }
        action={
          !isSmall ? (
            <Alert
              icon={
                <Avatar
                  alt={poster.displayName}
                  src={poster.avatar}
                  className={classes.posterAvatar}
                />
              }
              variant="outlined"
              severity="info"
            >
              <Typography variant="caption">
                Posted by {poster.displayName}
                <br></br>
                {createdAt}
              </Typography>
            </Alert>
          ) : null
        }
        key={title}
        title={
          <Link
            to={`/posts/${id}`}
            className={classes.postsTitle}
            color="primary"
          >
            <Typography variant='h6'>{title}</Typography>
          </Link>
        }
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {summary}
        </Typography>
        {isSmall ? (
          <Alert
            className={classes.smPoster}
            icon={<Avatar alt={poster.displayName} src={poster.avatar} />}
            variant="outlined"
            severity="info"
          >
            <Typography variant="caption">
              Posted by {poster.displayName}
              <br></br>
              {createdAt}
            </Typography>
          </Alert>
        ) : null}
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
          <Typography paragraph>Summary:</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            dangerouslySetInnerHTML={createMarkup()}
          ></Typography>
          {avatars.length === 0 ? null : (
            <>
              <Typography className={classes.activeDevelopers}>
                Active developers:{' '}
              </Typography>
              <AvatarGroup className={classes.avatarGroup} max={4}>
                {avatars.map((avatar) => (
                  <Avatar alt="avatar" src={avatar} />
                ))}
              </AvatarGroup>
            </>
          )}
        </CardContent>
      </Collapse>
      <Toast open={open} setOpen={setOpen} text={'Login to like a post!'} />
    </Card>
  );
}
