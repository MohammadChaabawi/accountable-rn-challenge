import React, {useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import List from '../../components/list/List';
import {setData} from '../../redux/actions';
import API from '../../services/API';
import {IAction} from '../../types/IAction';
import {RootState} from '../../types/IStore';
import {reduxData} from '../../types/types';

interface Props {
  route: any;
  navigation: any;
  reduxData: reduxData;
  setReduxData: (data: reduxData) => IAction;
}

const Home: React.FC<Props> = ({
  route = null,
  navigation,
  reduxData,
  setReduxData,
}: Props) => {
  const fetchApiData = useCallback(() => {
    !reduxData &&
      API.fetchData()
        .then((data: any): void => {
          data && setReduxData({list: data});
        })
        .catch(e => {
          if (e.message === 'retry') {
            Alert.alert('Error', 'Would you like to retry', [
              {
                text: 'Cancel',
                onPress: (): void => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Retry', onPress: (): void => fetchApiData()},
            ]);
          } else if (e.message === 'failure') {
            alert('Error, please check your internet connection');
          }
        });
  }, [reduxData]);

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <>
      <List navigation={navigation} data={route?.params?.item || reduxData} />
    </>
  );
};

interface ReduxStateToProps {
  reduxData: reduxData;
}

interface ReduxDispatchToProps {
  setReduxData: (data: reduxData) => IAction;
}

const mapStateToProps = (state: RootState): ReduxStateToProps => ({
  reduxData: state.app.data,
});

const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatchToProps => ({
  setReduxData: (data: reduxData) => dispatch(setData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
