/** @format */

import React from "react";
import { AbstractStorageItem } from "../../../../../models/objects/item";
import {
  kCardImageHeight,
  kCurrencyMap,
} from "../../../../../models/utils/values";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Button,
} from "@material-ui/core";

interface Props {
  item: AbstractStorageItem;
}

export default function StorageItem(props: Props) {
  const { item } = props;

  return (
    <Card elevation={14} raised>
      {item.images.length > 0 ? (
        <CardMedia
          image={item.images[0].image}
          style={{ height: kCardImageHeight, width: "100%" }}
        />
      ) : (
        <div
          style={{
            height: kCardImageHeight,
            width: "100%",
            display: "grid",
            alignItems: "center",
          }}
        >
          <Typography> No Image</Typography>
        </div>
      )}
      <CardContent>
        <Typography variant="h6">
          {kCurrencyMap[item.unit] ?? "$"}
          {item.price}
        </Typography>
        <Typography variant="subtitle1" noWrap>
          {item.name}
        </Typography>
        <Typography variant="body2" noWrap>
          {item.description}
        </Typography>
        <Button
          onClick={() => {
            window.location.href = "#/detail/" + item.id;
          }}
          variant="outlined"
          fullWidth
          color="primary"
          disableElevation
        >
          详情
        </Button>
      </CardContent>
    </Card>
  );
}
