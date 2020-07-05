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
import { DetailStorageItem } from "./objects/item";
import { Currency } from "./objects/currency";

interface State {
  isLoading: boolean;
  item?: DetailStorageItem;
  error?: string;
  currency?: { [key: string]: number };
  fetchCurrency(): Promise<void>;
  fetchItem(id: any): Promise<void>;
  convert(amount: number, from: string, to: string): number;
}

interface Props {}

//@ts-ignore
const context: State = {};

export const DetailContext = React.createContext(context);

export default class DetailProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      fetchItem: this.fetchItem,
      fetchCurrency: this.fetchCurrency,
      convert: this.convertCurrency,
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

    setTimeout(() => this.hideError(), 1000);
  };

  private hideError = () => {
    this.setState({
      error: undefined,
    });
  };

  fetchCurrency = async (id?: any) => {
    try {
      this.beforeFetch();

      let url = "https://api.exchangeratesapi.io/latest?base=CNY";
      let response = await axios.get(url);
      this.setState({ currency: response.data.rates });
    } catch (err) {
      this.showError(err);
    } finally {
      this.afterFetch();
    }
  };

  convertCurrency = (amount: number, from: string, to: string) => {
    const { currency } = this.state;
    if (currency) {
      const originalRate = currency[from];
      const convertRate = currency[to];
      if (originalRate && convertRate) {
        return (amount / originalRate) * convertRate;
      }
    }

    return 0;
  };

  fetchItem = async (id?: any) => {
    try {
      this.beforeFetch();

      let response = await Axios.get(`${itemURL}/${id}`);
      this.setState({
        item: response.data,
      });
    } catch (err) {
      this.showError(err);
    } finally {
      this.afterFetch();
    }
  };

  render() {
    return (
      <DetailContext.Provider value={this.state}>
        {this.props.children}
      </DetailContext.Provider>
    );
  }
}
