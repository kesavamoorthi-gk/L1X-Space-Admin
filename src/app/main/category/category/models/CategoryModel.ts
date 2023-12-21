/* eslint-disable prettier/prettier */
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { CategoryType } from '../../types/CategoryType';

/**
 * The product model.
 */
const CategoryModel = (data: PartialDeep<CategoryType>) =>
	_.defaults(data || {}, {
		// _id: _.uniqueId('product-'),
		// id: _.uniqueId('product-'),
		name: '',
		category_image: '',
		icon_color: '',
		box_color: '',
		// status: '',
		// created_at: '',
		// handle: '',
		// description: '',
		// categories: [],
		// tags: [],
		// featuredImageId: '',
		images: [],
		// priceTaxExcl: 0,
		// priceTaxIncl: 0,
		// taxRate: 0,
		// comparedPrice: 0,
		// quantity: 0,
		// sku: '',
		// width: '',
		// height: '',
		// depth: '',
		// weight: '',
		// extraShippingFee: 0,
		// price: '',
		// active: true,
		// image: '',
		// total: ''
	});

export default CategoryModel;
