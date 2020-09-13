import React, { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TabPanel from './TabPanel';
import UserPosts from '../UserPage';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Summary from './Summary';
import UserSolution from '../UserSolutions';
import { UserContext } from '../../context/UserContext';

const a11yProps = (index) => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`
});

const useStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: palette.background.paper,
    width: '100%'
  }
}));

export default function Nav() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Posts" {...a11yProps(1)} />
          {user && user.isDeveloper && <Tab label="Solutions" {...a11yProps(3)} />}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Summary />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UserPosts />
        </TabPanel>
        {user && user.isDeveloper && (<TabPanel value={value} index={2} dir={theme.direction}>
          <UserSolution />
        </TabPanel>)}
      </SwipeableViews>
    </div>
  );
}
