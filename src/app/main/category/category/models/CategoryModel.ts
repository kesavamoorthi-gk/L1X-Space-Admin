import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { NewCategoryType } from '../../types/CategoryType';

/**
 * The product model.
 */
const CategoryModel = (data: PartialDeep<NewCategoryType>) =>
	_.defaults(data || {}, {
		name: '',
		category_image: '',
		icon_color: '',
		box_color: ''
	});

export default CategoryModel;
