import {Action} from 'redux';
/**
 * The typing for the actions
 */
export interface IAction extends Action {
  payload?: any;
  type: string;
}
