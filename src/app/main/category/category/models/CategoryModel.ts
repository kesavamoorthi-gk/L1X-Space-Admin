import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { CategoryType } from '../../types/CategoryType';

/**
 * The product model.
 */
const CategoryModel = (data: PartialDeep<CategoryType>) =>
	_.defaults(data || {}, {
		_id: _.uniqueId('product-'),
		name: '',
		category_image:'',
		icon_color:'',
		box_color:''
	});

export default CategoryModel;
