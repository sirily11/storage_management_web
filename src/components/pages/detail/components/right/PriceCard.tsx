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
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CardContent } from "@material-ui/core";
import { kAvaliableCurrencies } from "../../../../models/utils/values";
import { DetailContext } from "../../../../models/DetailContext";

export default function PriceCard(props: { item: DetailStorageItem }) {
  const { item } = props;
  const { convert } = React.useContext(DetailContext);

  const [currentCurrency, setCurrency] = React.useState<string>("");
  const [convertedPrice, setConvertedPrice] = React.useState<number>();

  return (
    <Box mt={4} ml={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">售价</Typography>
          <Typography variant="h6">
            {item.unit} {item.price}
          </Typography>
          <Fade in={convertedPrice !== undefined} mountOnEnter unmountOnExit>
            <div>
              <Typography variant="h6">
                {currentCurrency} {convertedPrice?.toFixed(2)}
              </Typography>
            </div>
          </Fade>

          <Divider />

          <Box mt={3} mb={3}>
            <FormControl fullWidth>
              <InputLabel>Convert to: </InputLabel>
              <Select
                variant="filled"
                value={currentCurrency}
                onChange={(e) => {
                  let cur = e.target.value as string;
                  setCurrency(cur);
                  let convertedPrice = convert(item.price, item.unit, cur);
                  setConvertedPrice(convertedPrice);
                }}
              >
                {kAvaliableCurrencies.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Typography variant="overline">
            数据来自: https://api.exchangeratesapi.io/
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
