import React, {useState, useEffect} from 'react';
import {TextInput, Button, List, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {useUserContext} from '../../contexts/user';
import {useHistory} from 'react-router-dom';

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
});

export const Friendships = () => {
  const userState = useUserContext();
  const [friend, setFriend] = useState('');

  return (
    <View>
      <TextInput
        mode="outlined"
        label="friend"
        onChangeText={text => setFriend(text)}
      />
      <Button
        style={styles.button}
        onPress={() => userState.actions.addFriend(friend)}
        mode="contained">
        add friend
      </Button>
      <Text style={styles.text}> Current friends: </Text>
      {userState?.friendships &&
        userState.friendships.map(friendship => {
          return (
            <List.Item
              title={friendship.friend}
              key={`friend ${friendship.friend}`}
            />
          );
        })}
    </View>
  );
};
