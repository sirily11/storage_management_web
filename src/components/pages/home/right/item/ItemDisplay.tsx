/** @format */

import React from "react";
import { HomeContext } from "../../../../models/HomeContext";
import { Box, Grid } from "@material-ui/core";
import StorageItem from "./components/StorageItem";

export default function ItemDisplay() {
  const { items } = React.useContext(HomeContext);

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        {items.map((i, index) => (
          <Grid item key={index} sm={4} lg={3} xs={12}>
            <StorageItem item={i} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
