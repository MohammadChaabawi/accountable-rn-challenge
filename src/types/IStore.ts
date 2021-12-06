import {AnyAction, Dispatch} from 'redux';
import {Element, reduxData} from './types';

export interface RootState {
  app: AppState;
}

export interface AppState {
  selectedElement: Element;
  elementStack: Element[];
  data: reduxData;
}

export interface IStore {
  dispatch: Dispatch<AnyAction>;
  getState: () => RootState;
}
