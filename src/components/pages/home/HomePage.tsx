/** @format */

import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import LeftSidebar from "./left/LeftSidebar";
import { HomeContext } from "../../models/HomeContext";
import RightContent from "./right/RightContent";
import { Toolbar } from "@material-ui/core";
import { kDrawerWidth } from "../../models/utils/values";
import { useLocation } from "react-router-dom";
//@ts-ignore
import { Helmet } from "react-helmet";

import queryString from "query-string";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      width: `calc(100% - ${kDrawerWidth}px)`,
      marginLeft: kDrawerWidth,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function HomePage() {
  let { search } = useLocation();
  const classes = useStyles();
  const {
    isLoading,
    fetchItem,
    fetchSettings,
    updateCurrentSettings,
    error,
  } = React.useContext(HomeContext);

  React.useEffect(() => {
    const { category, location, position } = queryString.parse(search);

    fetchItem({
      category: category,
      location: location,
      position: position,
    }).then(async () => {
      let settings = await fetchSettings();
      if (settings) {
        let foundCateogy = settings.categories.find(
          (c) => `${c.id}` === category
        );
        let foundPosition = settings.positions.find(
          (p) => `${p.id}` === position
        );
        let foundLocation = settings.locations.find(
          (l) => `${l.id}` === location
        );

        updateCurrentSettings(foundLocation, foundPosition, foundCateogy);
      }
    });
  }, [search]);
  return (
    <div>
      <Helmet>
        <title>Storage Management System</title>
      </Helmet>
      <LeftSidebar />
      <RightContent />
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        message={`${error ?? ""}`}
        open={error !== undefined}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </div>
  );
}
