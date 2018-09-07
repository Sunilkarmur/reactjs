import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import Products from './reducerProducts';
import Compare from './reducerCompare';

const rootReducers = combineReducers({
    Products,
    Compare,
    form: formReducer
});

export default rootReducers