/**
 * This file includes all the reducers under reducers directory,
 * Import all and add to combineReducers to use any among whole app
 */
import {combineReducers} from 'redux';
import app from './app';

/**
 * This combines all the reducers that are applied on the global state
 */
export default combineReducers({
  app,
});
