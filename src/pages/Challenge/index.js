import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Menu, Button, Card, Checkbox, Text} from 'react-native-paper';
import {useChallengeContext} from '../../contexts/challenge';
import {routes} from '../../pages/Router';
import {useHistory} from 'react-router-dom';
import {UserContext, useUserContext} from '../../contexts/user';

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  date: {
    flex: 2,
    fontSize: 8,
  },
  box: {
    flex: 1,
  },
});

export const Challenge = props => {
  const history = useHistory();
  const challengeContext = useChallengeContext();
  const userContext = useUserContext();

  const challengeId = props.match.params.id;
  const challenge = challengeContext?.challenges?.find(
    challenge => challenge.id == challengeId,
  );

  const [showFriends, setShowFriends] = useState(false);

  const boxes = [];
  for (let i = 0; i < challenge?.times; i++) {
    boxes.push(true);
  }

  return (
    <View>
      <Card elevation={4} style={styles.card}>
        <Card.Title
          title={challenge?.name}
          subtitle={`${challenge?.times} times / week`}
          right={() => {
            return (
              <Button
                onPress={() => {
                  challengeContext?.actions?.repeatChallenge(challenge.id);
                }}>
                Done!
              </Button>
            );
          }}
        />
      </Card>
      {challenge?.participants?.map(participant => {
        return (
          <Card
            elevation={4}
            style={styles.card}
            key={`card_${participant.username}`}>
            <Card.Title
              key={`card_title_${participant.username}`}
              title={participant?.username}
              right={() => {
                return (
                  <>
                    {boxes.map((box, index) => (
                      <>
                        {participant.repetitions.length > index && (
                          <Text
                            key={`${participant.username} checkbox_text_no_${index}`}
                            style={styles.date}>
                            {new Date(
                              participant.repetitions[index].epochSecond * 1000,
                            ).toLocaleTimeString()}
                          </Text>
                        )}

                        <Checkbox
                          key={`${participant.username} checkbox_no_${index}`}
                          style={styles.box}
                          status={
                            participant.repetitions.length > index
                              ? 'checked'
                              : 'unchecked'
                          }
                          disabled="true"
                        />
                      </>
                    ))}
                  </>
                );
              }}
            />
          </Card>
        );
      })}
      {challenge?.isOwner && (
        <Menu
          visible={showFriends}
          onDismiss={() => setShowFriends(false)}
          anchor={
            <Button
              onPress={() => {
                setShowFriends(true);
              }}
              mode="contained"
              style={styles.button}>
              add friend to challenge
            </Button>
          }>
          {userContext?.friendships?.map(friendship => (
            <Menu.Item
              key={`friend_${friendship.friend}`}
              onPress={() => {
                challengeContext?.actions?.addUserToChallenge(
                  challenge.id,
                  friendship.friend,
                );
              }}
              title={friendship.friend}
            />
          ))}
        </Menu>
      )}
    </View>
  );
};
