/** @format */

import React from "react";
import { useRouteMatch } from "react-router-dom";
import { DetailContext } from "../../models/DetailContext";
import {
  makeStyles,
  Theme,
  createStyles,
  Backdrop,
  CircularProgress,
  Fade,
  Container,
  Box,
  Grid,
  Divider,
} from "@material-ui/core";
import TitleDisplay from "./components/title/TitleDisplay";
import ImageDisplay from "./components/image/ImageDisplay";
import ItemDescription from "./components/right/ItemDescription";
import PriceCard from "./components/right/PriceCard";
import QRCodeCard from "./components/right/QRCodeCard";
import DetailDescription from "./components/details/DetailDescription";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function DetailPage() {
  const classes = useStyles();
  const match = useRouteMatch("/detail/:id");
  const detailID = (match?.params as any).id;
  const { fetchItem, fetchCurrency, isLoading, item } = React.useContext(
    DetailContext
  );
  React.useEffect(() => {
    fetchItem(detailID).then(async () => await fetchCurrency());
  }, [detailID]);

  return (
    <div style={{ height: "100vh" }}>
      {item && (
        <Fade in={true}>
          <Box my={2} mx={2}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <TitleDisplay item={item} />
                <Grid container>
                  <Grid item md={6} xs={12} sm={6}>
                    <ImageDisplay item={item} />
                  </Grid>
                  <Grid item md={6} xs={12} sm={6}>
                    <ItemDescription item={item} />
                  </Grid>
                </Grid>
                <Divider />
                <DetailDescription item={item} />
              </Grid>
              <Grid item xs={12} md={3}>
                <div style={{ position: "sticky", top: 20 }}>
                  <PriceCard item={item} />
                  <QRCodeCard item={item} />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      )}

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
