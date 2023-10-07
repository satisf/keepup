import React, {createContext, useContext, useState} from 'react';
import {useAuthenticationContext} from '../authentication';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const authState = useAuthenticationContext();
  const [user, setUser] = useState({});
  const [friendships, setFriendships] = useState([]);

  const getUser = async () => {
    fetch(
      'https://k142mq7qq9.execute-api.eu-central-1.amazonaws.com/backend/users',
      {
        method: 'get',
        headers: new Headers({
          Authorization: (await authState.actions.getIdToken()).jwtToken,
        }),
      },
    ).then(
      res => {
        res.ok &&
          res.json().then(
            success => {
              setUser(success);
            },
            err => {},
          );
      },
      err => {},
    );
  };

  const getFriendships = async () => {
    fetch(
      'https://k142mq7qq9.execute-api.eu-central-1.amazonaws.com/backend/users/friendships',
      {
        method: 'get',
        headers: new Headers({
          Authorization: (await authState.actions.getIdToken()).jwtToken,
          cacheControl: 'no-cache',
        }),
      },
    ).then(
      res => {
        res.ok &&
          res.json().then(
            success => {
              setFriendships(success);
            },
            err => {},
          );
      },
      err => {},
    );
  };

  const addFriend = async friendName => {
    fetch(
      `https://k142mq7qq9.execute-api.eu-central-1.amazonaws.com/backend/users/friendship/${friendName}/offer`,
      {
        method: 'post',
        headers: new Headers({
          Authorization: (await authState.actions.getIdToken()).jwtToken,
        }),
      },
    )
      .then(res => {
        return res;
      })
      .then(
        res =>
          res.ok &&
          res.json().then(
            success => {
              getFriendships();
            },
            err => {},
          ),
        err => {},
      );
  };

  const clear = () => {
    setFriendships([]);
    setUser({});
  };

  const actions = {
    getUser,
    getFriendships,
    addFriend,
    clear,
  };

  return (
    <UserContext.Provider value={{user, friendships, actions}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
