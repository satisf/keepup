import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useChallengeContext} from '../../contexts/challenge';
import {routes} from '../../pages/Router';
import {useHistory} from 'react-router-dom';

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
});

export const AddChallenge = () => {
  const challengeContext = useChallengeContext();
  const [challengeName, setChallengeName] = useState('');
  const [times, setTimes] = useState();
  const history = useHistory();

  return (
    <View>
      <TextInput
        mode="outlined"
        label="challenge name"
        style={styles.input}
        onChangeText={text => setChallengeName(text)}
      />
      <TextInput
        mode="outlined"
        label="How often per week?"
        style={styles.input}
        onChangeText={text => setTimes(text)}
        keyboardType="numeric"
      />
      <Button
        onPress={() => {
          challengeContext.actions.addChallenge(
            challengeName,
            'P1W',
            times,
            Date.now(),
          );
          history.push(routes.HOME);
        }}
        mode="contained"
        style={styles.button}>
        add challenge
      </Button>
    </View>
  );
};
