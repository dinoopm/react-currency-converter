import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import Footer from "./Footer";
import Header from "./Header";


export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "Currency"
    };
  }
  render() {
    return (
      <div>
          <Header/>
          <CurrencyConverter/>
          <Footer/>
      </div>
      );
  }
}