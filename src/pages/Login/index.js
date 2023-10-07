import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {Text, View, StyleSheet} from 'react-native';
import {Link} from 'react-router-native';
import {useAuthenticationContext} from '../../contexts/authentication';
import {useHistory} from 'react-router-dom';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  register: {
    fontSize: 24,
    textAlign: 'right',
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
});

export const Login = () => {
  const authState = useAuthenticationContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const login = async () => {
    const loginError = await authState.actions.signIn(username, password);
    if (!loginError) {
      history.push('/');
    } else {
      setError(loginError);
    }
  };

  return (
    <View>
      <Text style={styles.text}>log in to keep up</Text>
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
      <Link to="register">
        <Text style={styles.register}>or register</Text>
      </Link>
      <Button onPress={() => login()} mode="contained">
        LOGIN
      </Button>
      <Text style={styles.error}>{error && error.message}</Text>
    </View>
  );
};
