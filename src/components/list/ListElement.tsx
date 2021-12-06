import {Box, Heading, Stack, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Element} from '../../types/types';

interface Props {
  item: Element;
  parentTitle: string;
  itemNavigationHandler: (item: Element, parentTitle: string) => void;
}

const ListElement: React.FC<Props> = ({
  item,
  parentTitle,
  itemNavigationHandler,
}: Props) => {
  return (
    <>
      <TouchableOpacity
        onPress={(): void => itemNavigationHandler(item, parentTitle)}>
        <Box overflow="hidden" borderColor="coolGray.200" borderWidth="1">
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {item.title}
              </Heading>
              <Text
                fontSize="xs"
                color="violet.500"
                fontWeight="500"
                ml="-0.5"
                mt="-1">
                {item.description}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default ListElement;
