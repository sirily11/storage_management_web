/** @format */

import React, { Component } from "react";
import axios from "axios";
import {
  AbstractStorageItem,
  Settings,
  Category,
  Location,
  Position,
} from "./objects/item";
import Axios from "axios";
import { settingsURL, itemURL } from "./utils/urls";
import { settings } from "cluster";

interface State {
  items: AbstractStorageItem[];
  settings: Settings;
  nextURL?: string;
  error?: string;
  openDrawer: boolean;
  currentCategory?: Category;
  currentPosition?: Position;
  currentLocation?: Location;
  isLoading: boolean;
  updateCurrentSettings(
    currentLocation?: Location,
    currentPosition?: Position,
    currentCategory?: Category
  ): void;
  fetchSettings(): Promise<Settings | undefined>;
  fetchItem(selection: {
    category?: any;
    position?: any;
    location?: any;
  }): Promise<void>;
  fetchMore(): Promise<void>;
  setOpenDrawer(value: boolean): void;
}

interface Props {}

//@ts-ignore
const context: State = {};

export const HomeContext = React.createContext(context);

export default class HomeProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      openDrawer: false,
      items: [],
      settings: {
        categories: [],
        locations: [],
        positions: [],
        series: [],
        authors: [],
      },
      setOpenDrawer: this.setOpenDrawer,
      updateCurrentSettings: this.updateCurrentSettings,
      fetchItem: this.fetchItem,
      fetchMore: this.fetchMore,
      fetchSettings: this.fetchSettings,
    };
  }

  private beforeFetch = () => {
    this.setState({
      isLoading: true,
    });
  };

  private afterFetch = () => {
    this.setState({
      isLoading: false,
    });
  };

  private showError = (error: any) => {
    this.setState({
      error: `${error}`,
    });

    setTimeout(() => this.hideError(), 3000);
  };

  private hideError = () => {
    this.setState({
      error: undefined,
    });
  };

  setOpenDrawer = (v: boolean) => {
    this.setState({ openDrawer: v });
  };

  updateCurrentSettings = (
    currentLocation?: Location,
    currentPosition?: Position,
    currentCategory?: Category
  ) => {
    this.setState({
      currentCategory: currentCategory,
      currentPosition: currentPosition,
      currentLocation: currentLocation,
    });
  };

  fetchSettings = async (): Promise<Settings | undefined> => {
    let settings: Settings | undefined = undefined;
    try {
      this.beforeFetch();
      let response = await Axios.get<Settings>(settingsURL);
      this.setState({
        settings: response.data,
      });
      settings = response.data;
    } catch (err) {
      this.showError(err);
    } finally {
      this.afterFetch();
      return settings;
    }
  };
  fetchItem = async (selection: {
    category?: any;
    position?: any;
    location?: any;
  }) => {
    const { category, position, location } = selection;
    try {
      this.beforeFetch();
      let url = itemURL;

      if (
        category !== undefined ||
        position !== undefined ||
        location !== undefined
      ) {
        url = `${itemURL}/?category=${category ?? ""}&location=${
          location ?? ""
        }&detail_position=${position ?? ""}`;
      }
      let response = await Axios.get(url);
      this.setState({
        items: response.data.results,
        nextURL: response.data.next,
      });
    } catch (err) {
      this.showError(err);
    } finally {
      this.afterFetch();
    }
  };
  fetchMore = async () => {
    const { nextURL } = this.state;
    if (!nextURL) {
      return;
    }
    try {
      this.beforeFetch();
      let response = await Axios.get(nextURL);
      this.setState({
        items: response.data.results,
        nextURL: response.data.next,
      });
    } catch (err) {
      this.showError(err);
    } finally {
      this.afterFetch();
    }
  };

  render() {
    return (
      <HomeContext.Provider value={this.state}>
        {this.props.children}
      </HomeContext.Provider>
    );
  }
}
