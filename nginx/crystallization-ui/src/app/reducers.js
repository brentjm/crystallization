import { combineReducers } from 'redux';
import { processState } from '../process-map/reducers';


const app = combineReducers({
  processState
});

export default app;
