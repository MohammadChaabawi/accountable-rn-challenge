import {Element} from '../types/types';

const updateData = (
  data: Element[],
  id: string,
  values: Element,
): Element[] => {
  for (let i = 0; i < data?.length; i++) {
    if (data[i].id === id) {
      data[i].title = values.title;
      data[i].description = values.description;
      break;
    } else if (data[i].list) {
      updateData(data[i].list!, id, values);
    }
  }
  return data;
};

const removeData = (data: Element[], id: string, parent: string): Element[] => {
  for (let i: number = 0; i < data?.length; i++) {
    if (parent.length === 0) {
      data = data.filter((item: Element): boolean => item.id !== id);
      break;
    } else if (data[i].title === parent) {
      data[i].list = data[i]?.list?.filter(
        (item: Element): boolean => item.id !== id,
      );
      break;
    } else if (data[i].list) {
      removeData(data[i]?.list!, id, parent);
    }
  }
  return data;
};

export const shuffleArray = (array: Element[]): Element[] => {
  let currentIndex: number = array.length,
    randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default {
  updateData,
  removeData,
  shuffleArray,
};
