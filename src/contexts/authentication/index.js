import React, {createContext, useContext, useState} from 'react';
import {Auth} from 'aws-amplify';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);

  async function signUp(username, password) {
    try {
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {},
      });
      signIn(username, password);
    } catch (error) {
      return error;
    }
  }

  async function signIn(username, password) {
    try {
      const response = await Auth.signIn(username, password);
      setLoggedIn(true);
      return response;
    } catch (error) {
      return error;
    }
  }

  async function signOut() {
    Auth.signOut().then(
      success => {
        setLoggedIn(false);
        return;
      },
      error => {
        return error;
      },
    );
  }

  async function getIdToken() {
    return (await Auth.currentSession()).getIdToken();
  }

  const actions = {
    signUp,
    signIn,
    signOut,
    getIdToken,
  };

  return (
    <AuthenticationContext.Provider value={{loggedIn, actions}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};
