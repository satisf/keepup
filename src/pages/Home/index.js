import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useAuthenticationContext} from '../../contexts/authentication';
import {TextInput, Button} from 'react-native-paper';
import {useChallengeContext} from '../../contexts/challenge';
import {useUserContext} from '../../contexts/user';
import ChallegneCard from '../../components/ChallengeCard';
import {useHistory} from 'react-router-dom';
import {routes} from '../../pages/Router';

export const Home = () => {
  const challengeContext = useChallengeContext();
  const history = useHistory();
  const userContext = useUserContext();

  const findOwnRepetitions = challenge => {
    return (
      challenge.participants.find(
        participant => participant.username === userContext.user.username,
      )?.repetitions.length || 0
    );
  };

  return (
    <View>
      {challengeContext?.challenges?.map(challenge => {
        return (
          <ChallegneCard
            key={`challenge_card_${challenge.id}`}
            name={challenge.name}
            times={challenge.times}
            repetitions={findOwnRepetitions(challenge)}
            onPress={() => history.push(`/challenge/${challenge.id}`)}
          />
        );
      })}

      <Button
        onPress={() => {
          history.push(routes.ADD_CHALLENGE);
        }}
        mode="contained">
        add challenge
      </Button>
    </View>
  );
};
