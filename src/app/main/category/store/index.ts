import { combineReducers } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import category from './categorySlice';


/**
 * The E-Commerce store reducer.
 */
const reducer = combineReducers({
    categories,
    category

});

export default reducer;
