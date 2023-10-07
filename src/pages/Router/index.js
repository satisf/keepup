import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Route} from 'react-router-native';
import {Login} from '../Login';
import {Register} from '../Register';
import {AddChallenge} from '../AddChallenge';
import {Challenge} from '../Challenge';
import NavigationDrawer from '../../components/NavigationDrawer';
import {ProtectdRoute} from '../../components/ProtectedRoute';
import {Appbar, DefaultTheme} from 'react-native-paper';
import {useHistory} from 'react-router-dom';
import {Friendships} from '../Friendships';
import {useAuthenticationContext} from '../../contexts/authentication';
import {useUserContext} from '../../contexts/user';
import {useChallengeContext} from '../../contexts/challenge';
import {Home} from '../Home';

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

const routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FRIENDSHIPS: '/friendships',
  ADD_CHALLENGE: '/add-challenge',
  CHALLENGE: '/challenge/:id',
};

const Router = () => {
  const history = useHistory();
  const authState = useAuthenticationContext();
  const userState = useUserContext();
  const challengeContext = useChallengeContext();
  const [navOpen, setNavOpen] = useState(false);

  const goBack = () => {
    history.goBack();
  };

  useEffect(async () => {
    if (authState.loggedIn) {
      await userState.actions.getUser();
      await userState.actions.getFriendships();
      await challengeContext.actions.getChallenges();
    } else {
      userState.actions.clear();
      challengeContext.actions.clear();
    }
  }, [authState.loggedIn]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="keep.up" />
        {authState.loggedIn && (
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => setNavOpen(!navOpen)}
          />
        )}
      </Appbar.Header>
      <NavigationDrawer open={navOpen} close={() => setNavOpen(false)} />
      <View style={styles.container}>
        <ProtectdRoute path={routes.HOME} component={Home} />
        <ProtectdRoute path={routes.FRIENDSHIPS} component={Friendships} />
        <ProtectdRoute path={routes.ADD_CHALLENGE} component={AddChallenge} />
        <ProtectdRoute path={routes.CHALLENGE} component={Challenge} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.REGISTER} component={Register} />
      </View>
    </View>
  );
};

export default Router;
export {routes};
