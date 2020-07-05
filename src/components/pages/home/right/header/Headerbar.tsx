/** @format */

import React from "react";
import { HomeContext } from "../../../../models/HomeContext";
import {
  Box,
  Typography,
  Card,
  makeStyles,
  Theme,
  createStyles,
  Avatar,
  Divider,
  Grid,
  Fade,
  Breadcrumbs,
} from "@material-ui/core";
import { kDrawerWidth } from "../../../../models/utils/values";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerbar: {
      marginTop: "auto",
      marginBottom: "auto",
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

export default function Headerbar() {
  const {
    currentCategory,
    currentLocation,
    currentPosition,
  } = React.useContext(HomeContext);
  const classes = useStyles();
  return (
    <Box display="block" mt={1}>
      <Box my={1}>
        <Grid container>
          <Grid item>
            <Avatar className={classes.large} src={currentPosition?.image} />
          </Grid>
          <Fade
            in={currentPosition !== undefined || currentLocation !== undefined}
          >
            <Grid item style={{ display: "flex", marginLeft: 10 }}>
              <Breadcrumbs className={classes.headerbar}>
                <Typography>{currentLocation?.name}</Typography>
                <Typography>{currentPosition?.name}</Typography>
              </Breadcrumbs>
            </Grid>
          </Fade>
        </Grid>
      </Box>
      <Divider />
      <Typography style={{ marginTop: 10 }} variant="h4">
        {currentCategory?.name ?? "All"}
      </Typography>
    </Box>
  );
}
