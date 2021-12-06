import {
  Element,
  reduxData,
  removeItemProps,
  updateItemProps,
} from '../../types/types';

export const ACTION_TYPES = {
  DATA: {
    SET_DATA: 'SET_DATA',
    SET_ELEMENT: 'SET_ELEMENT',
    APPEND_ELEMENT_STACK: 'APPEND_ELEMENT_STACK',
    RESET_ELEMENT_STACK: 'RESET_ELEMENT_STACK',
    UPDATE_ITEM: 'UPDATE_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    POP_ELEMENT_STACK: 'POP_ELEMENT_STACK',
  },
};

export const setSelectedElement = (element: Element) => ({
  type: ACTION_TYPES.DATA.SET_ELEMENT,
  payload: element,
});

export const appendElementStack = (element: Element) => ({
  type: ACTION_TYPES.DATA.APPEND_ELEMENT_STACK,
  payload: element,
});

export const popElementStack = () => ({
  type: ACTION_TYPES.DATA.POP_ELEMENT_STACK,
});

export const setData = (data: reduxData) => ({
  type: ACTION_TYPES.DATA.SET_DATA,
  payload: data,
});

export const updateItem = (item: updateItemProps) => ({
  type: ACTION_TYPES.DATA.UPDATE_ITEM,
  payload: item,
});

export const removeItem = (data: removeItemProps) => ({
  type: ACTION_TYPES.DATA.REMOVE_ITEM,
  payload: data,
});

export const resetElementStack = () => ({
  type: ACTION_TYPES.DATA.RESET_ELEMENT_STACK,
});
