/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import CategoriesTable from "./CategoriesTable";
import CategoriesHeader from "./CategoriesHeader";

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

/**
 * The Categories page.
 */
function Categories() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<CategoriesHeader />}
      content={<CategoriesTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
  // return (
  //   <Root
  //     header={<CategoriesHeader />}
  //     content={<CategoriesTable />}
  //     scroll={isMobile ? "normal" : "content"}
  //   />
  // );
}

export default Categories;
