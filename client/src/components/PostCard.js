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
import axios from 'axios';
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
    fill: "#52b202"
  }
}));

export default function PostCard({ id, title, description, details, score, likedBy }) {
  // Material UI card
  const classes = useStyles();
  const { user, isLoaded } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [likes, setLikes] = useState(score)
  const [liked, setLiked] = useState(null)
  const [open, setOpen] = React.useState(false);

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
        const result = await axios.put('https://app-factory-api.herokuapp.com/api/posts/like', {
          postId: id,
          userId: user._id
        })
      } catch (err) {
        console.error('ERROR - PostCard.js - likeHandler', err);
      }
    }
  }

  const unlikeHandler = async () => {
    try {
      setLikes(likes - 1);
      setLiked(false);
      console.log(id);
      console.log(user._id);
      const result = await axios.put('https://app-factory-api.herokuapp.com/api/posts/unlike', {
        postId: id,
        userId: user._id
      });
      console.log(result);
    } catch (err) {
      console.error('ERROR - PostCard.js - unlikeHandler', err);
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="post" className={classes.avatar}>
            P
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        key={title}
        title={title}
        subheader="September 14, 2016"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
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
          <Typography paragraph>More About:</Typography>
          <Typography paragraph>{details}</Typography>
        </CardContent>
      </Collapse>
      <Toast open={open} setOpen={setOpen} />
    </Card>
  );
}
