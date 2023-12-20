/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Typography from "@mui/material/Typography";
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

function Categoryy() {
  return (
    <Root
      header={
        <div className="flex w-full container">
          <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 md:pb-0">
            <div className="flex flex-col flex-auto">
              <Typography className="text-3xl font-semibold tracking-tight leading-8">
                Categories
              </Typography>
              <Typography
                className="font-medium tracking-tight"
                color="text.secondary"
              >
                Categories list to show in the user side
              </Typography>
            </div>
            <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
              <Button
                className="whitespace-nowrap"
                startIcon={
                  <FuseSvgIcon size={20}>heroicons-solid:cog</FuseSvgIcon>
                }
              >
                Settings
              </Button>
              <Button
                className="whitespace-nowrap"
                variant="contained"
                color="secondary"
                startIcon={
                  <FuseSvgIcon size={20}>heroicons-solid:save</FuseSvgIcon>
                }
              >
                Export
              </Button>
            </div>
          </div>
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

export default Categoryy;
