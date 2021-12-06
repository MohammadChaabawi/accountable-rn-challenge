import {Box} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '../../theme/colors';

interface Props {
  question: string;
}

const Question = ({question}: Props) => {
  return (
    <Box style={styles.cardContainer}>
      <Text style={styles.questionText}>{question}</Text>
    </Box>
  );
};

export default Question;

const styles = StyleSheet.create({
  cardContainer: {
    height: 70,
    width: '95%',
    backgroundColor: colors.purple,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: colors.white,
    fontSize: 23,
    fontWeight: '500',
    padding: 3,
    paddingVertical: 5,
    alignSelf: 'center',
  },
});
