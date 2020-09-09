import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BuildIcon from '@material-ui/icons/Build';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BrushIcon from '@material-ui/icons/Brush';
import MicIcon from '@material-ui/icons/Mic';
import MovieIcon from '@material-ui/icons/Movie';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { UserContext } from '../context/UserContext';
import Toast from './Toast';
import API from '../utils/API';

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
    marginLeft: 5
  },
  liked: {
    fill: '#52b202'
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
  date
}) {
  // Material UI card
  const classes = useStyles();
  const { user, isLoaded } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [likes, setLikes] = useState(score);
  const [liked, setLiked] = useState(null);
  const [open, setOpen] = React.useState(false);

  // Date parsing
  const postDate = new Date(date);
  const createdAt = postDate.toLocaleString('en-GB', { timeZone: 'UTC' });

  // Icon selection based on category
  let categoryIcon;

  switch (category[0]) {
    case 'Business':
      categoryIcon = <BusinessCenterIcon />;
      break;
    case 'Utility':
      categoryIcon = <BuildIcon />;
      break;
    case 'Entertainment':
      categoryIcon = <MovieIcon />;
      break;
    case 'Design':
      categoryIcon = <BrushIcon />;
      break;
    case 'Journalism':
      categoryIcon = <MicIcon />;
      break;
    case 'Lifestyle':
      categoryIcon = <AccessibilityNewIcon />;
      break;
    case 'games':
      categoryIcon = <SportsEsportsIcon />;
      break;
    default:
      break;
  }

  // Checks whether logged in user has liked the post
  useEffect(() => {
    if (user) {
      if (likedBy.includes(user._id) && isLoaded) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [isLoaded]);

  // Toast handler for non-logged in users trying to like a post
  const handleToast = () => {
    setOpen(true);
  };

  // Handles expansion of card
  const handleExpandClick = (event) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  // Handles liking a post
  const likeHandler = async () => {
    if (!user) {
      handleToast();
    } else {
      try {
        setLikes(likes + 1);
        setLiked(true);
        const result = await API.likePost(id, user._id);
      } catch (err) {
        console.error('ERROR - PostCard.js - likeHandler', err);
      }
    }
  };

  // Handles unliking a post
  const unlikeHandler = async () => {
    try {
      setLikes(likes - 1);
      setLiked(false);
      const result = await API.unlikePost(id, user._id);
    } catch (err) {
      console.error('ERROR - PostCard.js - unlikeHandler', err);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="post" className={classes.avatar}>
            {categoryIcon}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        key={title}
        title={title}
        subheader={createdAt}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {summary}
        </Typography>
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
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
      <Toast open={open} setOpen={setOpen} />
    </Card>
  );
}
