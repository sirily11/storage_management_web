/** @format */

import React from "react";
import { DetailStorageItem } from "../../../../models/objects/item";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import QRCode from "qrcode.react";

export default function QRCodeCard(props: { item: DetailStorageItem }) {
  const { item } = props;

  return (
    <Box mt={4} ml={2} mb={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1">Scan this</Typography>
          <QRCode value={item.uuid} />
          <Box mt={1}>
            <Grid container spacing={2}>
              <Grid item>
                <Chip label={`数量:${item.quantity}`} />
              </Grid>
              <Grid item>
                <Chip label={`Col:${item.quantity}`} />
              </Grid>
              <Grid item>
                <Chip label={`Row:${item.quantity}`} />
              </Grid>
            </Grid>
          </Box>
          <ListItem>
            <ListItemText
              primary={"添加时间"}
              secondary={`${item.created_time}`}
            />
          </ListItem>
        </CardContent>
      </Card>
    </Box>
  );
}
