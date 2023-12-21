import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Many } from 'lodash';
import { WithRouterProps } from '@fuse/core/withRouter/withRouter';
import * as React from 'react';
import { getCategories, selectCategories, selectCategoriesSearchText } from '../store/categoriesSlice';
import CategoriesTableHead from './CategoriesTableHead';
import { CategoryType } from '../types/CategoryType';
import OrdersStatus from './CategoriesStatus';

type CategoriesTableProps = WithRouterProps & {
	navigate: (path: string) => void;
};

/**
 * The Categories table.
 */
function CategoriesTable(props: CategoriesTableProps) {
	const { navigate } = props;
	const dispatch = useAppDispatch();
	const categories = useAppSelector(selectCategories);
	console.log(categories);
	const searchText = useAppSelector(selectCategoriesSearchText);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<string[]>([]);
	const [data, setData] = useState(categories);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [tableOrder, setTableOrder] = useState<{
		direction: 'asc' | 'desc';
		id: string;
	}>({
		direction: 'asc',
		id: ''
	});

	useEffect(() => {
		dispatch(getCategories()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(categories, (item) => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(categories);
		}
	}, [categories, searchText]);

	function handleRequestSort(event: MouseEvent<HTMLSpanElement>, property: string) {
		const newOrder: {
			direction: 'asc' | 'desc';
			id: string;
		} = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	}

	function handleSelectAllClick(event: ChangeEvent<HTMLInputElement>) {
		console.log(data);
		if (event.target.checked) {
			setSelected(data.map((n) => n._id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item: CategoryType) {
		// navigate(`/categories/${item._id}/${item?.handle}`);
	}

	function handleCheck(event: ChangeEvent<HTMLInputElement>, id: string) {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, page: number) {
		setPage(+page);
	}

	function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
		setRowsPerPage(+event.target.value);
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no Categories!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<CategoriesTableHead
						selectedProductIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								(o: CategoryType) => {
									switch (o._id) {
										case '_id': {
											return parseInt(o._id, 10);
										}
										case 'name': {
											return o.name;
										}
										case 'category_image': {
											return o.category_image;
										}
										case 'status': {
											return o.status;
										}
										default: {
											return o._id;
										}
									}
								}
							],
							[tableOrder.direction] as Many<boolean | 'asc' | 'desc'>
						)
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((n ,i) => {
							console.log(n,'single')
							const isSelected = selected.indexOf(n._id) !== -1;
							return (
								<TableRow
									className="h-72 cursor-pointer"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={n._id}
									selected={isSelected}
									onClick={() => handleClick(n)}
								>
									<TableCell
										className="w-40 md:w-64 text-center"
										padding="none"
									>
										<Checkbox
											checked={isSelected}
											onClick={(event) => event.stopPropagation()}
											onChange={(event) => handleCheck(event, n._id)}
										/>
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{i+1}
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.name}
									</TableCell>

									<TableCell
										className="p-4 md:p-16 truncate"
										component="th"
										scope="row"
									>
									   <img src={n.category_image} alt="Category" style={{ width: '60px', height: '60px', objectFit: 'cover' }}
											/>
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										<OrdersStatus id={n.status} />
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{new Date(n.created_at).toLocaleString()}
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
				</Table>
			</FuseScrollbars>
			<TablePagination
				className="shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(CategoriesTable);
