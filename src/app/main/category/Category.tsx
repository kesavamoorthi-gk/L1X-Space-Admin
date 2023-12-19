/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";

import CustomizedTables from "./CategoryList/CategoryListTable";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

function Category() {
  return (
    <Root
      header={
        <div className="p-24">
          <h1>Categories</h1>
        </div>
      }
      content={
        <div className="p-24">
          <CustomizedTables />
          <br />
        </div>
      }
    />
  );
}

export default Category;
