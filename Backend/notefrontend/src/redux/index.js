import { combineReducers } from 'redux';
import authReducer from './slice/authSlice';
import noteReducer from './slice/noteSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  notes: noteReducer,
});

export default rootReducer;
