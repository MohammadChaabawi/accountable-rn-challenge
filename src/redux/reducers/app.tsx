import dataHelpers from '../../helpers/dataHelpers';
import {IAction} from '../../types/IAction';
import {AppState} from '../../types/IStore';
import {ACTION_TYPES} from '../actions';

const initialState = {
  selectedElement: {} as any,
  elementStack: [],
  data: null as any,
};

export default (state: AppState = initialState, action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.DATA.SET_ELEMENT:
      return {
        ...state,
        selectedElement: action.payload,
      };
    case ACTION_TYPES.DATA.APPEND_ELEMENT_STACK:
      return {
        ...state,
        elementStack: [...state.elementStack, action.payload],
      };
    case ACTION_TYPES.DATA.RESET_ELEMENT_STACK:
      return {
        ...state,
        elementStack: [],
      };
    case ACTION_TYPES.DATA.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ACTION_TYPES.DATA.UPDATE_ITEM:
      const {id, values} = action?.payload;
      let updatedData = dataHelpers.updateData(state.data.list, id, values);
      return {
        ...state,
        data: {list: [...updatedData], root: true},
      };
    case ACTION_TYPES.DATA.REMOVE_ITEM:
      let filteredData = dataHelpers.removeData(
        state.data.list,
        action.payload.id,
        action.payload.parent,
      );
      return {
        ...state,
        data: {list: [...filteredData], root: true},
      };
    case ACTION_TYPES.DATA.POP_ELEMENT_STACK:
      let updatedElementStack = state.elementStack;
      updatedElementStack.pop();
      return {
        ...state,
        elementStack: updatedElementStack,
      };
    default:
      return state;
  }
};
