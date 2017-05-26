import {combineReducers} from 'redux';

import {boards} from './boards';
import {session} from './session';


export default combineReducers({
  boards,
  session
});