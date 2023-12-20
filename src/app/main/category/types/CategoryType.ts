import { CategoryImageType } from './CategoryImageType';

/**
 * Category Type
 */
export type CategoryType = {
	id: string;
	name: string;
	handle: string;
	description: string;
	categories: string[];
	tags: string[];
	featuredImageId: string;
	images: CategoryImageType[];
	priceTaxExcl: number;
	priceTaxIncl: number;
	taxRate: number;
	comparedPrice: number;
	quantity: number;
	sku: string;
	width: string;
	height: string;
	depth: string;
	weight: string;
	extraShippingFee: number;
	active: boolean;
	price: string;
	image: string;
	total: string;
};

export type CategoriesType = CategoryType[];
