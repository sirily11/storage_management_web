/** @format */

import React from "react";
import { DetailStorageItem } from "../../../../models/objects/item";
import { Box, Typography, Breadcrumbs, Divider } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { NavLink } from "react-router-dom";

export default function TitleDisplay(props: { item: DetailStorageItem }) {
  const { item } = props;

  return (
    <Box mt={4}>
      <Breadcrumbs>
        <NavLink to={`/?location=${item.location_name.id}`}>
          {item.location_name.name}
        </NavLink>
        <NavLink to={`/?position=${item.position_name.id}`}>
          {item.position_name.name}
        </NavLink>
      </Breadcrumbs>
      <Typography variant="h6">{item.name}</Typography>
      <Rating name="simple-controlled" value={4} />
      <Divider />
    </Box>
  );
}
