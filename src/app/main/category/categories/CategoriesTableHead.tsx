import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import { useAppDispatch } from "app/store";
import { removeCategories } from "../store/categoriesSlice";

/**
 * The table head row type.
 */
type rowType = {
  id: string;
  align: "left" | "center" | "right";
  disablePadding: boolean;
  label: string;
  sort: boolean;
};

/**
 * The table head rows data.
 */
const rows: rowType[] = [
  {
    id: "image",
    align: "left",
    disablePadding: true,
    label: "",
    sort: false,
  },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "categories",
    align: "left",
    disablePadding: false,
<<<<<<< HEAD
    label: "Category",
=======
    label: "Image",
>>>>>>> master
    sort: true,
  },
  {
    id: "priceTaxIncl",
<<<<<<< HEAD
    align: "right",
    disablePadding: false,
    label: "Price",
=======
    align: "left",
    disablePadding: false,
    label: "Status",
>>>>>>> master
    sort: true,
  },
  {
    id: "quantity",
<<<<<<< HEAD
    align: "right",
    disablePadding: false,
    label: "Quantity",
    sort: true,
  },
  {
    id: "active",
    align: "right",
    disablePadding: false,
    label: "Active",
    sort: true,
  },
=======
    align: "left",
    disablePadding: false,
    label: "Date",
    sort: true,
  },
  // {
  //   id: "active",
  //   align: "right",
  //   disablePadding: false,
  //   label: "Active",
  //   sort: true,
  // },
>>>>>>> master
];

type CategoriesTableHeadPropsType = {
  selectedProductIds: string[];
  onRequestSort: (event: MouseEvent<HTMLSpanElement>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tableOrder: {
    direction: "asc" | "desc";
    id: string;
  };
  rowCount: number;
  onMenuItemClick: () => void;
};

/**
 * The Categories table head component.
 */
function CategoriesTableHead(props: CategoriesTableHeadPropsType) {
  const {
    selectedProductIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  const numSelected = selectedProductIds.length;

  const [selectedCategoriesMenu, setSelectedCategoriesMenu] =
    useState<HTMLButtonElement | null>(null);

  const dispatch = useAppDispatch();

  const createSortHandler = (
    event: MouseEvent<HTMLSpanElement>,
    property: string
  ) => {
    onRequestSort(event, property);
  };

  function openSelectedCategoriesMenu(event: MouseEvent<HTMLButtonElement>) {
    setSelectedCategoriesMenu(event.currentTarget);
  }

  function closeSelectedCategoriesMenu() {
    setSelectedCategoriesMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount !== 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.default,
              }}
            >
              <IconButton
                aria-haspopup="true"
                onClick={openSelectedCategoriesMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedCategoriesMenu"
                anchorEl={selectedCategoriesMenu}
                open={Boolean(selectedCategoriesMenu)}
                onClose={closeSelectedCategoriesMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(removeCategories(selectedProductIds));
                      onMenuItemClick();
                      closeSelectedCategoriesMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                tableOrder.id === row.id ? tableOrder.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={tableOrder.id === row.id}
                    direction={tableOrder.direction}
                    onClick={(ev: MouseEvent<HTMLSpanElement>) =>
                      createSortHandler(ev, row.id)
                    }
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default CategoriesTableHead;
