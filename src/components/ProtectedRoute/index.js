import React, {useEffect} from 'react';
import {useAuthenticationContext} from '../../contexts/authentication';
import {NativeRouter, Route, Link} from 'react-router-native';
import {useHistory} from 'react-router-dom';
import {Login} from '../../pages/Login';

export const ProtectdRoute = ({component, path}) => {
  const authState = useAuthenticationContext();

  return (
    <Route
      exact
      path={path}
      component={authState.loggedIn ? component : Login}
    />
  );
};
