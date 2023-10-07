import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Link} from 'react-router-native';
import {Dialog, Portal, Button, Paragraph} from 'react-native-paper';
import {routes} from '../../pages/Router';
import {useHistory} from 'react-router-dom';
import {useAuthenticationContext} from '../../contexts/authentication';
import {useChallengeContext} from '../../contexts/challenge';
import {useUserContext} from '../../contexts/user';

const NavigationDrawer = ({open, close}) => {
  const history = useHistory();
  const authState = useAuthenticationContext();
  const challengeState = useChallengeContext();
  const userState = useUserContext();

  return (
    <View>
      <Portal>
        <Dialog visible={open} onDismiss={() => close()}>
          <Dialog.Title>Navigation</Dialog.Title>
          <Dialog.Content>
            <Button
              onPress={() => {
                close();
                history.push(routes.HOME);
              }}>
              Home
            </Button>
          </Dialog.Content>

          <Dialog.Content>
            <Button
              onPress={() => {
                close();
                history.push(routes.FRIENDSHIPS);
              }}>
              Friendships
            </Button>
          </Dialog.Content>

          <Dialog.Content>
            <Button
              onPress={() => {
                close();
                authState.actions.signOut();
              }}>
              Logout
            </Button>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => close()}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default NavigationDrawer;
