import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ThumbUpAltIcon } from '@material-ui/icons/ThumbUpAlt';
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
} from '@material-ui/core';

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
    fill: "#52b202"
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
  const [likes, setLikes] = useState(score)
  const [liked, setLiked] = useState(null)
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
        const result = await API.likePost(id, user._id);
      } catch (err) {
        console.error('ERROR - PostCard.js - likeHandler', err);
      }
    }
  }

  const unlikeHandler = async () => {
    try {
      setLikes(likes - 1);
      setLiked(false);
      const result = await API.unlikePost(id, user._id);
    } catch (err) {
      console.error('ERROR - PostCard.js - unlikeHandler', err);
    }
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
        {!isLoaded ? null : [liked && isLoaded ?
          <IconButton aria-label="thumb down" onClick={unlikeHandler} >
            <ThumbUpAltIcon className={classes.liked} />
            <Typography variant="h6" className={classes.score}>
              {likes}
            </Typography>
          </IconButton> :
          <IconButton aria-label="thumb up" onClick={likeHandler}>
            <ThumbUpAltIcon />
            <Typography variant="h6" className={classes.score}>
              {likes}
            </Typography>
          </IconButton>]
        }
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
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
      <Toast open={open} setOpen={setOpen} />
    </Card>
  );
}
