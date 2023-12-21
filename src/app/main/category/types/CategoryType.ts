import { CategoryImageType } from './CategoryImageType';

/**
 * Category Type
 */
export type CategoryType = {
	_id?: string;
	id?: string;
	name: string;
	category_image?: string;
	icon_color?: string;
	box_color?: string;
	status?: number;
	created_at?: string;
	tags?: string[];
	featuredImageId?: string;
	images?: CategoryImageType[];
	priceTaxExcl?: number;
	priceTaxIncl?: number;
	taxRate?: number;
	comparedPrice?: number;
	quantity?: number;
	sku?: string;
	width?: string;
	height?: string;
	depth?: string;
	weight?: string;
	extraShippingFee?: number;
	active?: boolean;
	price?: string;
	image?: string;
	total?: string;
};

export type CategoriesType = CategoryType[];
