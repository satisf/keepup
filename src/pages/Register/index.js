import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useAuthenticationContext} from '../../contexts/authentication';
import {useHistory} from 'react-router-dom';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  button: {
    marginTop: 10,
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
});

export const Register = () => {
  const authState = useAuthenticationContext();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = async () => {
    const registerError = await authState.actions.signUp(username, password);
    if (!registerError) {
      history.push('/');
    } else {
      setError(registerError);
    }
  };

  return (
    <View>
      <Text style={styles.text}>register to keep up</Text>
      <TextInput
        mode="outlined"
        label="username"
        autoCompleteType="username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        autoCompleteType="password"
        autoCorrect={false}
        mode="outlined"
        label="password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />

      <Button style={styles.button} onPress={() => register()} mode="contained">
        REGISTER
      </Button>
      <Text style={styles.error}>{error && error.message}</Text>
    </View>
  );
};
