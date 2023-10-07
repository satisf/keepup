import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Link} from 'react-router-native';
import {
  Dialog,
  Portal,
  Card,
  Paragraph,
  Title,
  Checkbox,
} from 'react-native-paper';
import {routes} from '../../pages/Router';
import {useHistory} from 'react-router-dom';
import {useAuthenticationContext} from '../../contexts/authentication';

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
});

const ChallegneCard = ({name, times, repetitions, onPress}) => {
  const boxes = [];
  for (let i = 0; i < times; i++) {
    if (i < repetitions) {
      boxes.push(true);
    } else {
      boxes.push(false);
    }
  }
  return (
    <Card elevation={4} style={styles.card} onPress={() => onPress()}>
      <Card.Title
        title={name}
        subtitle={`${times} times / week`}
        right={() => {
          return (
            <>
              {boxes.map((boxChecked, index) => (
                <Checkbox
                  key={`checkbox_no_${index}`}
                  status={boxChecked ? 'checked' : 'unchecked'}
                  disabled={boxChecked ? true : false}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
};

export default ChallegneCard;
