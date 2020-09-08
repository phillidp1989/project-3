import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  github: {
    color: '#ffffff',
    backgroundColor: '#333',
    margin: 15,
    width: 270,
    "&:hover, &:focus": {
      backgroundColor: '#0c0c0c',
    }
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  icon: {
    marginRight: 10
  },
  developer: {
    [theme.breakpoints.up(780)]: {
      width: '50%'
    }
  }
}));

export default function DeveloperLogin() {
  const classes = useStyles();

  return (
    <div className={classes.developer}>
      <Typography variant="h6">
        Sign up or login as a developer
      </Typography>
      <div className={classes.btnContainer}>
        <Button
          variant="contained"
          className={classes.github}
          color="primary"
          href="/auth/github"
        >
          <GitHubIcon className={classes.icon} />
          Continue with Github
        </Button>
      </div>
    </div>
  );
}

