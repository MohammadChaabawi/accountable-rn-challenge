import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from '@react-navigation/elements';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Button, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {shuffleArray} from '../../helpers/dataHelpers';
import {
  appendElementStack,
  popElementStack,
  setSelectedElement,
} from '../../redux/actions';
import colors from '../../theme/colors';
import {IAction} from '../../types/IAction';
import {RootState} from '../../types/IStore';
import {Element} from '../../types/types';
import AnswerElement from '../question/AnswerElement';
import Question from '../question/Question';
import ListElement from './ListElement';

const KEYS_TO_FILTERS = [
  'title',
  'list',
  'question',
  'description',
  'displayName',
];

interface Props {
  data: Element;
  setSelectedElement: (element: Element) => IAction;
  navigation: any;
  appendElementStack: (element: Element) => IAction;
  popElementStack: () => IAction;
  elementStack: Element[];
}

interface renderItemProps {
  item: Element;
  index: number;
}

const List: React.FC<Props> = ({
  data,
  setSelectedElement,
  navigation,
  appendElementStack,
  popElementStack,
  elementStack,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [shuffledData, setShuffledData] = useState<Element[]>([]);

  const shuffleItems = (): void => {
    if (data && data.list) {
      let shuffledListElements: Element[] = [...data.list!];
      let newShuffledData: Element[] = shuffleArray(shuffledListElements);
      setShuffledData(newShuffledData);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props: HeaderBackButtonProps) => (
        <>
          <Button title="Shuffle" onPress={shuffleItems} />
        </>
      ),
    });
    return (): void => {
      setSearchTerm('');
      setShuffledData([]);
    };
  }, [data]);

  useLayoutEffect((): void => {
    navigation.setOptions({
      headerLeft: (props: JSX.IntrinsicAttributes & HeaderBackButtonProps) => (
        <>
          {elementStack.length > 0 && (
            <HeaderBackButton
              {...props}
              onPress={() => {
                popElementStack();
                navigation.goBack();
              }}
            />
          )}
        </>
      ),
    });
  }, [navigation, elementStack]);

  // implement call back that would set the selected item in redux to keep one connect for list and to keep one function
  const updateSelectedElement = (item: Element): void => {
    item.list && appendElementStack(item);
    setSelectedElement(item);
  };

  let listElements: Element[] =
    (shuffledData?.length > 0 && shuffledData) || data?.list || [];
  let filteredElements: Element[] = listElements.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );

  const itemNavigationHandler = useCallback(
    (item, parentTitle): void => {
      if (item.id) {
        navigation.navigate('Details', {item, parentTitle});
      } else {
        updateSelectedElement(item);
        navigation.push('Home', {item, parentTitle});
      }
    },
    [data, shuffledData, filteredElements],
  );

  const renderItem = useCallback(
    ({item, index}: renderItemProps) => {
      if (data?.question) {
        return (
          <AnswerElement
            parentTitle={data?.title}
            item={item}
            key={index}
            index={index}
            itemNavigationHandler={itemNavigationHandler}
          />
        );
      } else {
        return (
          <ListElement
            parentTitle={data?.title}
            item={item}
            key={index}
            itemNavigationHandler={itemNavigationHandler}
          />
        );
      }
    },
    [data, shuffledData, filteredElements],
  );
  return (
    <>
      <SearchInput
        onChangeText={(term: string): void => {
          setSearchTerm(term);
        }}
        style={styles.searchInput}
        placeholder="Type to search"
      />
      {data?.question && <Question question={data.question} />}
      <FlatList
        data={filteredElements}
        renderItem={renderItem}
        keyExtractor={(item: Element) => item.title}
      />
    </>
  );
};

interface ReduxStateToProps {
  elementStack: Element[];
}

interface ReduxDispatchToProps {
  setSelectedElement: (element: Element) => IAction;
  appendElementStack: (element: Element) => IAction;
  popElementStack: () => IAction;
}

const mapStateToProps = (state: RootState): ReduxStateToProps => ({
  elementStack: state.app.elementStack,
});

const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatchToProps => ({
  setSelectedElement: (element: Element) =>
    dispatch(setSelectedElement(element)),
  appendElementStack: (element: Element) =>
    dispatch(appendElementStack(element)),
  popElementStack: () => dispatch(popElementStack()),
});

const styles = StyleSheet.create({
  searchInput: {
    padding: 12,
    fontSize: 18,
    borderColor: colors.gray,
    borderWidth: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
