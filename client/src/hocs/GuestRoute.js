import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function GuestRoute({ component: Component, ...rest }) {
  const { user, isLoaded } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoaded) {
          return null;
        } else if (user && isLoaded) {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}
