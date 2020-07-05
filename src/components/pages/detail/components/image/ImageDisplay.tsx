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
import { Card } from "@material-ui/core";

export default function ImageDisplay(props: { item: DetailStorageItem }) {
  const { item } = props;

  return (
    <Box mt={4} mb={4}>
      {item.images_objects.length === 0 && (
        <Card
          variant="outlined"
          style={{ height: 400, alignItems: "center", display: "grid" }}
        >
          <Typography style={{ marginLeft: "auto", marginRight: "auto" }}>
            No image
          </Typography>
        </Card>
      )}

      {item.images_objects.length > 0 && (
        <Carousel
          showArrows={true}
          width={"100%"}
          renderThumbs={() =>
            item.images_objects.map((e) => (
              <CardMedia
                key={`thumb-${e.id}`}
                image={e.image}
                style={{ height: 50, width: 100 }}
              />
            ))
          }
        >
          {item.images_objects.map((e, i) => (
            <CardMedia
              image={e.image}
              key={i}
              style={{ height: 400, width: "100%" }}
            />
          ))}
        </Carousel>
      )}
    </Box>
  );
}
