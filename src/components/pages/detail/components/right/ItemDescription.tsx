/** @format */

import React from "react";
import { DetailStorageItem } from "../../../../models/objects/item";
import {
  Box,
  Typography,
  Breadcrumbs,
  CardMedia,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function ItemDescription(props: { item: DetailStorageItem }) {
  const { item } = props;

  return (
    <Box mt={4} ml={2}>
      <Typography>{item.description}</Typography>
    </Box>
  );
}
