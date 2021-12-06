import {HeaderBackButton} from '@react-navigation/elements';
import {Formik} from 'formik';
import {Box, Center, CloseIcon, Divider, Fab, VStack} from 'native-base';
import React, {useLayoutEffect, useRef} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as Yup from 'yup';
import {
  removeItem,
  resetElementStack,
  setSelectedElement,
  updateItem,
} from '../../redux/actions';
import colors from '../../theme/colors';
import {IAction} from '../../types/IAction';
import {RootState} from '../../types/IStore';
import {
  Element,
  removeItemProps,
  updateItemProps,
  values,
} from '../../types/types';

interface Props {
  route: any;
  elementStack: Element[];
  updateItem: (elementToUpdateData: updateItemProps) => IAction;
  removeItem: (elementToRemoveData: removeItemProps) => IAction;
  navigation: any;
  resetElementStack: () => IAction;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Please enter the required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for the title'),
  description: Yup.string()
    .required('Please enter the required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for the description'),
});

const Details: React.FC<Props> = ({
  route,
  elementStack,
  updateItem,
  removeItem,
  navigation,
  resetElementStack,
}: Props) => {
  const formRef = useRef<any>();
  const {item} = route?.params;
  const handleSubmitBeforeUnmount = (): void => {
    if (formRef.current) {
      let {title, description}: values = formRef.current.values;
      if (
        (title && title !== item?.title) ||
        (description && description !== item?.description)
      ) {
        Alert.alert(
          'You Have Unsaved Changes',
          'Please save or discard your changes',
          [
            {
              text: 'Save',
              onPress: (): void => {
                formRef.current.submitForm();
              },
            },
            {text: 'Discard', onPress: () => navigation.goBack()},
          ],
        );
      } else {
        navigation.goBack();
      }
    }
  };

  useLayoutEffect((): void => {
    navigation.setOptions({
      headerLeft: (
        props: JSX.IntrinsicAttributes &
          import('@react-navigation/elements').HeaderBackButtonProps,
      ) => (
        <>
          <HeaderBackButton {...props} onPress={handleSubmitBeforeUnmount} />
        </>
      ),
    });
  }, [navigation]);

  const handleSubmit = (values: values): void => {
    updateItem({id: item.id, values});
    alert('Item Updated Successfully');
    resetElementStack();
    navigation.navigate('Home');
  };
  const handleRemove = (): void => {
    let parent: string =
      elementStack.length > 0
        ? elementStack[elementStack.length - 1].title
        : '';
    removeItem({id: item.id, parent});
    alert('Item Removed Successfully');
    resetElementStack();
    navigation.navigate('Home');
  };
  return (
    <>
      <Fab
        colorScheme="red"
        placement="bottom-right"
        label="Remove Item"
        bottom="10"
        icon={<CloseIcon size="5" color="white" />}
        onPress={handleRemove}
      />
      <VStack space={4} style={styles.container}>
        {elementStack.length > 0 && (
          <>
            <Box style={styles.sectionWrapper} borderRadius="md">
              <VStack space="4">
                <Text style={styles.label}>Parent Titles</Text>
                <Box px="4">
                  <Center
                    style={{width: '100%', padding: 12}}
                    h="20"
                    bg="violet.600"
                    rounded="md"
                    shadow={9}>
                    {elementStack &&
                      elementStack.map((element: Element, index) => {
                        if (element?.title) {
                          return (
                            <Text style={styles.cardDescription} key={index}>
                              {element?.title}
                            </Text>
                          );
                        }
                      })}
                  </Center>
                </Box>
              </VStack>
            </Box>
            <Divider style={styles.divider} />
          </>
        )}
      </VStack>
      <Formik
        innerRef={formRef}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          title: item?.title ?? '',
          description: item?.description ?? '',
        }}>
        {(props: any) => {
          let {errors}: any = props;
          return (
            <View style={{width: '100%'}}>
              {errors?.title && (
                <Text style={styles.errorLabel}>{errors.title}</Text>
              )}
              <Text style={styles.label}>Title</Text>
              <Center
                style={{margin: 20}}
                h="20"
                bg="primary.600"
                rounded="md"
                shadow={9}>
                <TextInput
                  multiline
                  value={props.values.title}
                  style={styles.cardTitle}
                  onChangeText={(text: string): void =>
                    props.setFieldValue('title', text)
                  }
                />
              </Center>
              <Divider style={styles.divider} />
              {errors?.description && (
                <Text style={styles.errorLabel}>{errors.description}</Text>
              )}
              <Text style={styles.label}>Description</Text>
              <Center
                style={{margin: 20}}
                h="32"
                bg="emerald.600"
                rounded="md"
                shadow={9}>
                <TextInput
                  value={props.values.description}
                  multiline
                  style={styles.cardDescription}
                  onChangeText={(text: string): void =>
                    props.setFieldValue('description', text)
                  }
                />
              </Center>
              <Button
                disabled={errors?.title || errors?.description}
                onPress={props.handleSubmit}
                title="SUBMIT"
              />
            </View>
          );
        }}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: {
    width: '95%',
    alignSelf: 'center',
  },
  label: {textAlign: 'center', fontSize: 18, marginTop: 20},
  errorLabel: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
    color: colors.red,
  },
  divider: {
    marginTop: 20,
    height: 0.3,
    alignSelf: 'center',
    backgroundColor: colors.gray,
    width: '80%',
  },
  cardTitle: {
    color: colors.white,
    fontSize: 30,
  },
  cardDescription: {
    color: colors.white,
    fontSize: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});

interface ReduxStateToProps {
  elementStack: Element[];
}

interface ReduxDispatchToProps {
  resetElementStack: () => IAction;
  setSelectedElement: (element: Element) => IAction;
  updateItem: (data: updateItemProps) => IAction;
  removeItem: (data: removeItemProps) => IAction;
}

const mapStateToProps = (state: RootState): ReduxStateToProps => ({
  elementStack: state.app.elementStack,
});

const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatchToProps => ({
  resetElementStack: () => dispatch(resetElementStack()),
  setSelectedElement: (element: Element) =>
    dispatch(setSelectedElement(element)),
  updateItem: (data: updateItemProps) => dispatch(updateItem(data)),
  removeItem: (data: removeItemProps) => dispatch(removeItem(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
