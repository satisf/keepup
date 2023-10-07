import React, {createContext, useContext, useState} from 'react';
import {useAuthenticationContext} from '../authentication';

export const ChallengeContext = createContext();

export const ChallengeProvider = ({children}) => {
  const authState = useAuthenticationContext();
  const [challenges, setChallenges] = useState([]);

  const getChallenges = async () => {
    fetch(
      'https://k142mq7qq9.execute-api.eu-central-1.amazonaws.com/backend/challenges',
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
            challenges => {
              setChallenges(challenges);
            },
            err => {},
          );
      },
      err => {},
    );
  };

  const addChallenge = async (name, duration, times, startDate) => {
    fetch(
      'https://k142mq7qq9.execute-api.eu-central-1.amazonaws.com/backend/challenges',
      {
        method: 'put',
        headers: new Headers({
          Authorization: (await authState.actions.getIdToken()).jwtToken,
        }),
        body: JSON.stringify({
          name,
          duration,
          times,
          startDate,
        }),
      },
    ).then(
      res => {
        res.ok &&
          res.json().then(
            success => {
              getChallenges();
            },
            err => {},
          );
      },
      err => {},
    );
  };

  const addUserToChallenge = async (challengeId, username) => {
    fetch(
      `https://k142mq7qq9.execute-api.eu-central-1.amazonaws.com/backend/challenges/${challengeId}/add/${username}`,
      {
        method: 'post',
        headers: new Headers({
          Authorization: (await authState.actions.getIdToken()).jwtToken,
        }),
      },
    ).then(
      res => {
        res.ok && getChallenges();
      },
      err => {},
    );
  };

  const repeatChallenge = async challengeId => {
    fetch(
      `https://k142mq7qq9.execute-api.eu-central-1.amazonaws.com/backend/challenges/${challengeId}/repeat`,
      {
        method: 'post',
        headers: new Headers({
          Authorization: (await authState.actions.getIdToken()).jwtToken,
        }),
      },
    ).then(
      res => {
        res.ok && getChallenges();
      },
      err => {},
    );
  };

  const clear = () => {
    setChallenges(null);
  };

  const actions = {
    addChallenge,
    getChallenges,
    repeatChallenge,
    addUserToChallenge,
    clear,
  };

  return (
    <ChallengeContext.Provider value={{challenges, actions}}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallengeContext = () => {
  return useContext(ChallengeContext);
};
