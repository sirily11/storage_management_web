/** @format */

import React from "react";
import {
  Drawer,
  makeStyles,
  Theme,
  createStyles,
  List,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Button,
  Divider,
} from "@material-ui/core";
import { kDrawerWidth } from "../../../models/utils/values";
import { HomeContext } from "../../../models/HomeContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: kDrawerWidth,
      padding: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(3),
      padding: theme.spacing(3),
    },
    divider: {
      marginTop: 20,
      marginBottom: 20,
    },
  })
);

export default function LeftSidebar() {
  const classes = useStyles();
  const {
    currentCategory,
    currentLocation,
    currentPosition,
    settings,
  } = React.useContext(HomeContext);

  const [category, setCategory] = React.useState(-1);
  const [location, setLocation] = React.useState(-1);
  const [position, setPosition] = React.useState(-1);

  React.useEffect(() => {
    setCategory(currentCategory?.id ?? -1);
    setLocation(currentLocation?.id ?? -1);
    setPosition(currentPosition?.id ?? -1);
  }, [currentCategory, currentLocation, currentPosition]);

  return (
    <Drawer variant="permanent">
      <List className={classes.drawerPaper}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let foundCategory = settings.categories.find(
              (c) => c.id === category
            );
            let foundPosition = settings.positions.find(
              (p) => p.id === position
            );
            let foundLocation = settings.locations.find(
              (l) => l.id === location
            );

            window.location.href = `#/?category=${
              foundCategory?.id ?? ""
            }&location=${foundLocation?.id ?? ""}&position=${
              foundPosition?.id ?? ""
            }`;
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => {
                setCategory(parseInt(e.target.value));
              }}
            >
              <FormControlLabel value={-1} control={<Radio />} label="All" />
              {settings.categories.map((c, i) => (
                <FormControlLabel
                  key={`category-${i}`}
                  control={<Radio />}
                  value={c.id}
                  label={c.name}
                />
              ))}
            </RadioGroup>
            <Divider className={classes.divider} />
            <FormLabel component="legend">Location</FormLabel>
            <RadioGroup
              value={location}
              onChange={(e) => {
                setLocation(parseInt(e.target.value));
              }}
            >
              <FormControlLabel value={-1} control={<Radio />} label="All" />
              {settings.locations.map((c, i) => (
                <FormControlLabel
                  key={`location-${i}`}
                  control={<Radio />}
                  value={c.id}
                  label={c.name}
                />
              ))}
            </RadioGroup>
            <Divider className={classes.divider} />
            <FormLabel component="legend">Position</FormLabel>
            <RadioGroup
              value={position}
              onChange={(e) => {
                setPosition(parseInt(e.target.value));
              }}
            >
              <FormControlLabel value={-1} control={<Radio />} label="All" />
              {settings.positions.map((c, i) => (
                <FormControlLabel
                  key={`position-${i}`}
                  control={<Radio />}
                  value={c.id}
                  label={c.name}
                />
              ))}
            </RadioGroup>
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
      </List>
    </Drawer>
  );
}
