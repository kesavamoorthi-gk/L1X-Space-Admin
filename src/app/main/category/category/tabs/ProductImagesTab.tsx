/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import axios from 'axios';
import { useState } from 'react';
import { NewCategoryType } from '../../types/CategoryType';

const Root = styled('div')(({ theme }) => ({
	'& .productImageFeaturedStar': {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},

	'& .productImageUpload': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},

	'& .productImageItem': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& .productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& .productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover .productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

/**
 * The product images tab.
 */
function ProductImagesTab() {
	const methods = useFormContext();
	const { control, watch } = methods;

	const images = watch('images') as NewCategoryType['category_image'];
	const [file, setFile] = useState({});

	function handleChange(event) {
		const newFile = event.target.files[0];
		setFile(newFile);
		handleSubmit(newFile);
	}

	function handleSubmit(file) {
		// event.preventDefault();
		const url = 'https://l1profileapi.seaswap.co/api/v1/file-upload/upload';
		const formData = new FormData();
		formData.append('file', file);
		formData.append('service', 'admin-category');
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		axios.post(url, formData, config).then((response) => {
			// Assuming "response.data" is the API response
			const uploadedImage = response.data.data.url;

			// Set the uploaded image URL to the 'images' state
			methods.setValue('images', uploadedImage);
			methods.setValue('category_image', uploadedImage);
		});
	}

	return (
		<Root>
			<div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				<Controller
					name="images"
					control={control}
					render={({ field: { onChange } }) => (
						<Box
							sx={{
								backgroundColor: (theme) =>
									theme.palette.mode === 'light'
										? lighten(theme.palette.background.default, 0.4)
										: lighten(theme.palette.background.default, 0.02)
							}}
							component="label"
							htmlFor="button-file"
							className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
						>
							<input
								accept="image/*"
								className="hidden"
								id="button-file"
								type="file"
								onChange={handleChange}
								// onChange={async (e) => {
								// 	async function readFileAsync() {
								// 		return new Promise((resolve, reject) => {
								// 			const file = e?.target?.files?.[0];
								// 			if (!file) {
								// 				return;
								// 			}
								// 			const reader = new FileReader();

								// 			reader.onload = () => {
								// 				resolve({
								// 					id: FuseUtils.generateGUID(),
								// 					url: `data:${file.type};base64,${btoa(reader.result as string)}`,
								// 					type: 'image'
								// 				});
								// 			};

								// 			reader.onerror = reject;

								// 			reader.readAsBinaryString(file);
								// 			handleChange(file);
								// 		});
								// 	}

								// 	const newImage = await readFileAsync();

								// 	onChange(newImage);
								// }}
							/>
							<FuseSvgIcon
								size={32}
								color="action"
							>
								heroicons-outline:upload
							</FuseSvgIcon>
						</Box>
					)}
				/>
				{images && (
					<Controller
						name="featuredImageId"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => {
							return (
								<div
									onClick={() => onChange(images)}
									onKeyDown={() => onChange(images)}
									role="button"
									tabIndex={0}
									className={clsx(
										'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
										images === value && 'featured'
									)}
									key={images?.id}
								>
									{/* <FuseSvgIcon className="productImageFeaturedStar">
					heroicons-solid:star
				  </FuseSvgIcon> */}
									<img
										className="max-w-none w-auto h-full"
										src={images}
										alt="product"
									/>
								</div>
							);
						}}
					/>
				)}
			</div>
		</Root>
	);
}

export default ProductImagesTab;
