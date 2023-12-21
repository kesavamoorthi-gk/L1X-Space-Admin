import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { AsyncStateType, RootStateType } from 'app/store/types';
import { CategoryType, NewCategoryType } from '../types/CategoryType';
import CategoryModel from '../category/models/CategoryModel';
import history from '@history';

export type AppRootStateType = RootStateType<categorySliceType>;

/**
 * Get product from server by id
 */
export const getCategory = createAppAsyncThunk<CategoryType, string>(
	'categoriesApp/category/getCategory',
	async (productId) => {
		const response = await axios.get(`/api/ecommerce/categories/${productId}`);

		const data = (await response.data) as CategoryType;

		return data;
	}
);

/**
 * Remove product
 */
export const removeCategory = createAppAsyncThunk<string>(
	'categoriesApp/category/removeCategory',
	async (_, { getState }) => {
		const AppState = getState() as AppRootStateType;

		const { _id } = AppState.categoriesApp.category.data as CategoryType;

		await axios.delete(`/api/ecommerce/categories/${_id}`);

		return _id;
	}
);

/**
 * Save product
 */
export const saveCategory = createAppAsyncThunk<NewCategoryType, NewCategoryType>(
	'categoriesApp/category/saveCategory',
	async (productData,  { getState, dispatch }) => {
		const AppState = getState() as AppRootStateType;
	
		const { _id } = AppState.categoriesApp.category.data as CategoryType;
	
		try {
			const response = await axios.post(
				`https://l1profileapi.seaswap.co/api/v1/admin/create-category`,
				productData
			);
		
			const data = (await response.data) as CategoryType;
		    console.log(response.data.status_code,"1111111111111111")
			console.log(response.data,"9991111")
			if (response.data.status_code === 200) {
				console.log("1555111")
				dispatch(saveCategory.fulfilled(data, 'fulfilled'));
		
				// Redirect to another page using React Router
				history.push('/categories');
			}
		

			return data;
		} catch (error) {
			// Handle errors here
			console.error('Error:', error);
			throw error;
		}
	}
);

const initialState: AsyncStateType<CategoryType> = {
	data: null,
	status: 'idle'
};

/**
 * The E-Commerce product slice.
 */
export const categorySlice = createSlice({
	name: 'categoriesApp/category',
	initialState,
	reducers: {
		resetCategory: () => initialState,
		newCategory: (state) => {
			state.data = CategoryModel({});
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCategory.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(saveCategory.fulfilled, (state, action) => {
				state.data = action.payload;
			})
			.addCase(removeCategory.fulfilled, () => initialState);
	}
});

export const selectCategory = (state: AppRootStateType) => state.categoriesApp.category;

export const { newCategory, resetCategory } = categorySlice.actions;

export type categorySliceType = typeof categorySlice;

export default categorySlice.reducer;
