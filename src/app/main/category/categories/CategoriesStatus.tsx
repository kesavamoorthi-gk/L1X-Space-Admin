import _ from '@lodash';
import clsx from 'clsx';
import { CategoryStatusType } from '../types/CategoryStatusType';

/**
 * The order statuses.
 */
export const orderStatuses: CategoryStatusType[] = [
	{
		id: 1,
		name: 'Active',
		color: 'bg-green text-white'
	},
	{
		id: 2,
		name: 'not active',
		color: 'bg-red-700 text-white'
	},
];

/**
 * The orders status properties.
 */
type OrdersStatusProps = {
	id: Number;
};

/**
 * The orders status component.
 */
function OrdersStatus(props: OrdersStatusProps) {
	const { id } = props;

	return (
		<div
			className={clsx(
				'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
				_.find(orderStatuses, { id }).color
			)}
		>
			{_.find(orderStatuses, { id }).name}
		</div>
	);
}

export default OrdersStatus;