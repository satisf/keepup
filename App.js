import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Amplify} from 'aws-amplify';
import {config} from './amplify.config';
import {AuthenticationProvider} from './src/contexts/authentication';
import {UserProvider} from './src/contexts/user';
import {NativeRouter} from 'react-router-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {useHistory} from 'react-router-dom';
import {ChallengeProvider} from './src/contexts/challenge';
import Router from './src/pages/Router';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    accent: '#000000A6',
  },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 50,
    marginRight: 50,
  },
});

const App = () => {
  useEffect(() => {
    Amplify.configure(config);

    fetch(
      `https://k142mq7qq9.execute-api.eu-central-1.amazonaws.com/backend/lambda/warmup`,
      {
        method: 'get',
      },
    );
  });

  const history = useHistory();

  return (
    <PaperProvider theme={theme}>
      <AuthenticationProvider>
        <UserProvider>
          <ChallengeProvider>
            <NativeRouter>
              <Router />
            </NativeRouter>
          </ChallengeProvider>
        </UserProvider>
      </AuthenticationProvider>
    </PaperProvider>
  );
};

export default App;
