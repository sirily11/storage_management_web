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
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Fade,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Grid,
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CardContent } from "@material-ui/core";
import { kAvaliableCurrencies } from "../../../../models/utils/values";
import DetailMap from "./DetailMap";
import { NavLink } from "react-router-dom";

export default function DetailDescription(props: { item: DetailStorageItem }) {
  const { item } = props;

  return (
    <Box mt={4} ml={2}>
      <Typography variant="h6">Category Details</Typography>
      <NavLink to={`/?category=${item.category_name.id}`}>
        <Typography variant="subtitle2">{item.category_name.name}</Typography>
      </NavLink>
      <Box m={3} />
      <Typography variant="h6">Series Details</Typography>
      <Typography variant="subtitle2">{item.series_name.name}</Typography>
      <Typography>{item.series_name.description}</Typography>
      <Box m={3} />
      <Typography variant="h6">Author Details</Typography>
      <Typography variant="subtitle2">{item.author_name.name}</Typography>
      <Typography>{item.author_name.description}</Typography>
      <Box m={3} />
      <Typography variant="h6">Location Details</Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell>{item.location_name.country}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>City</TableCell>
                  <TableCell>{item.location_name.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Street</TableCell>
                  <TableCell>{item.location_name.street}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Building</TableCell>
                  <TableCell>{item.location_name.building}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Unit</TableCell>
                  <TableCell>{item.location_name.unit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Room Number</TableCell>
                  <TableCell>{item.location_name.room_number}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailMap item={item} />
        </Grid>
      </Grid>
      <Typography variant="h6">Position Details</Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">
            {item.position_name.position}
          </Typography>
          <Typography variant="body1">
            {item.position_name.description ?? "No Description"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          {item.position_name.image && (
            <Box ml={3}>
              <CardMedia
                image={item.position_name.image}
                style={{ height: 300 }}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
