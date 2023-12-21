import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Category Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
