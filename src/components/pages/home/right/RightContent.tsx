/** @format */

import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { kDrawerWidth } from "../../../models/utils/values";
import { HomeContext } from "../../../models/HomeContext";
import ItemDisplay from "./item/ItemDisplay";
import Headerbar from "./header/Headerbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${kDrawerWidth}px)`,
        marginLeft: kDrawerWidth,
      },

      marginTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
    },
  })
);
export default function RightContent() {
  const classes = useStyles();
  const { nextURL, fetchMore } = React.useContext(HomeContext);

  return (
    <div className={classes.content}>
      <Headerbar />
      <ItemDisplay />
      {nextURL && (
        <Button
          onClick={async () => {
            await fetchMore();
          }}
        >
          Load More
        </Button>
      )}
    </div>
  );
}
