import axios from 'axios';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { CategoryType, CategoriesType } from '../types/CategoryType';

export type AppRootStateType = RootStateType<categoriesSliceType>;
// eCommerceApp / categories / getCategories

/**
 * Get categories from server
 */
export const getCategories = createAppAsyncThunk<CategoriesType>('categoriesApp/categories/getCategories', async () => {
	const response = await axios.get('https://l1profileapi.seaswap.co/api/v1/admin/list-category');
	console.log(response);
	const data = (await response.data.data) as CategoriesType;

	return data;
});

/**
 * Remove categories
 */
export const removeCategories = createAppAsyncThunk<string[], string[]>(
	'categoriesApp/categories',
	async (categoryIds) => {
		await axios.delete('/api/ecommerce/categories', { data: categoryIds });

		return categoryIds;
	}
);

const productsAdapter = createEntityAdapter<CategoryType>({
	selectId: (category) => category._id
});

export const { selectAll: selectCategories, selectById: selectCategoryById } = productsAdapter.getSelectors(
	(state: AppRootStateType) => state?.categoriesApp?.categories
);

const initialState = productsAdapter.getInitialState({
	searchText: ''
});

/**
 * The E-Commerce categories slice.
 */
export const categoriesSlice = createSlice({
	name: 'categoriesApp/categories',
	initialState,
	reducers: {
		setCategoriesSearchText: (state, action) => {
			state.searchText = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCategories.fulfilled, (state, action) => {
				productsAdapter.setAll(state, action.payload);
				state.searchText = '';
			})
			.addCase(removeCategories.fulfilled, (state, action) => {
				productsAdapter.removeMany(state, action.payload);
			});

		// You can add more cases here similar to the provided example, e.g. removeCategories
	}
});

export const { setCategoriesSearchText } = categoriesSlice.actions;

export const selectCategoriesSearchText = (state: AppRootStateType) => state?.categoriesApp?.categories?.searchText;

export type categoriesSliceType = typeof categoriesSlice;

export default categoriesSlice.reducer;
