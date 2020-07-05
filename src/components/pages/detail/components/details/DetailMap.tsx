/** @format */

import React from "react";
import { DetailStorageItem } from "../../../../models/objects/item";
import {
  Box,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Fade,
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CardContent } from "@material-ui/core";
import { kAvaliableCurrencies } from "../../../../models/utils/values";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default function DetailMap(props: { item: DetailStorageItem }) {
  const { item } = props;
  const position = {
    lat: item.location_name.latitude ?? 0,
    lng: item.location_name.longitude ?? 0,
  };

  return (
    <Box ml={3}>
      <Map center={position} zoom={11} style={{ height: 350 }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{item.location_name.name}</Popup>
        </Marker>
      </Map>
    </Box>
  );
}
