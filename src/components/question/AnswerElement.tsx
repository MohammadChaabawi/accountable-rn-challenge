import {Box, Heading, Stack} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../theme/colors';
import {Element} from '../../types/types';

interface Props {
  item: Element;
  index: number;
  itemNavigationHandler: (item: Element, parentTitle: string) => void;
  parentTitle: string;
}

const AnswerElement: React.FC<Props> = ({
  item,
  index,
  itemNavigationHandler,
  parentTitle,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        onPress={(): void => {
          setSelected(true);
          itemNavigationHandler(item, parentTitle);
        }}>
        <Box
          overflow="hidden"
          rounded={10}
          borderColor="violet.400"
          borderWidth="1"
          style={[{margin: 5}, selected && {backgroundColor: colors.green}]}>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading
                style={selected && {color: colors.white}}
                size="md"
                ml="-1">
                {index + 1 + ') '}
                {item.title}
              </Heading>
            </Stack>
          </Stack>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default AnswerElement;
