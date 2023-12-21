import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import * as React from 'react';
import { getCategory, newCategory, resetCategory, selectCategory } from '../store/categorySlice';
import CategoryHeader from './CategoryHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import ProductImagesTab from './tabs/ProductImagesTab';
import ColorPalleteTab from './tabs/ColorPallete';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter a category name')
		.min(5, 'The category name must be at least 5 characters')
});

/**
 * The category page.
 */
function Category() {
	const dispatch = useAppDispatch();
	const { data: category, status } = useAppSelector(selectCategory);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noCategory, setNoCategory] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { categoryId } = routeParams;

			if (categoryId === 'new') {
				/**
				 * Create New Category data
				 */
				dispatch(newCategory());
			} else {
				/**
				 * Get Category data
				 */
				dispatch(getCategory(categoryId)).then((action) => {
					/**
					 * If the requested category is not exist show message
					 */
					if (!action.payload) {
						setNoCategory(true);
					}
				});
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!category) {
			return;
		}

		/**
		 * Reset the form on category state changes
		 */
		reset(category);
	}, [category, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Category on component unload
			 */
			dispatch(resetCategory());
			setNoCategory(false);
		};
	}, [dispatch]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event: SyntheticEvent, value: number) {
		setTabValue(value);
	}

	if (status === 'loading') {
		return <FuseLoading />;
	}
	/**
	 * Show Message if the requested categories is not exists
	 */
	if (noCategory) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There is no such category!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/categories"
					color="inherit"
				>
					Go to Categories Page
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while category data is loading and form is setted
	 */
	if (_.isEmpty(form) || (category && routeParams.categoryId !== category._id && routeParams.categoryId !== 'new')) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<CategoryHeader />}
				content={
					<>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							indicatorColor="secondary"
							textColor="secondary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64 border-b-1' }}
						>
							<Tab
								className="h-64"
								label="Basic Info"
							/>
							{/* <Tab className="h-64" label="Category Images" />
              <Tab className="h-64" label="Pricing" />
              <Tab className="h-64" label="Inventory" />
              <Tab className="h-64" label="Shipping" /> */}
						</Tabs>
						<div className="p-16 sm:p-24 max-w-3xl">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<BasicInfoTab />
								<h4 className="mb-5">Category Image</h4>

								<ProductImagesTab />
								<ColorPalleteTab />
							</div>

							{/* <div className={tabValue !== 1 ? 'hidden' : ''}>
								<ProductImagesTab />
							</div>

							<div className={tabValue !== 2 ? 'hidden' : ''}>
								<PricingTab />
							</div>

							<div className={tabValue !== 3 ? 'hidden' : ''}>
								<InventoryTab />
							</div>

							<div className={tabValue !== 4 ? 'hidden' : ''}>
								<ShippingTab /> 
							</div> */}
						</div>
					</>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Category;
