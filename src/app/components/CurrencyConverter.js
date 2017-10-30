import React from "react";
import { CURRENCIES } from '../utils/currencies';
import fx from "../utils/money";
import axios from 'axios';

export default class CurrencyConverter extends React.Component {
  constructor() {
    super();
    this.state = {
      fromCurrency: "USD",
      toCurrency: "INR",
      moneyValue: 1,
      toMoneyValue: ""
    }
  }

  changeFromCurrency(event) {
    let currency = event.target.value;

    this.setState({
      fromCurrency: currency
    });
  }

  changeToCurrency(event) {
    let currency = event.target.value;

    this.setState({
      toCurrency: currency
    });
  }

  changeMoneyValue(event) {
    let moneyValue = event.target.value;

    this.convertCurrency(
            this.state.moneyValue,
            this.state.fromCurrency,
            this.state.toCurrency
          );

    this.setState({
      moneyValue: moneyValue
    });
  }

  convertCurrency(money, fromCurrency, toCurrency) {

    let url = "http://api.fixer.io/latest";
    let self = this;
    axios.get(url).then(function(response){
      fx.base = "EUR";
      fx.rates = response.data.rates
      var rate = fx(money).from(fromCurrency).to(toCurrency)
        self.setState({
          toMoneyValue: rate.toFixed(2)
        });
    });  

  }

  render() {
    const currencyOptions = CURRENCIES.map((currency, index) => {
      return <option value={currency.value} key={index}>{currency.name}</option>
    });

    return (


      <div>
      <main className="mdl-layout__content">
          {
          this.convertCurrency(
            this.state.moneyValue,
            this.state.fromCurrency,
            this.state.toCurrency
          )
          }
          <div className="page-content">
          <div className="mdl-shadow--2dp currency-converter">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">{this.state.moneyValue} {this.state.fromCurrency} = </div>
              <div className="mdl-cell mdl-cell--12-col converted-value-text">{this.state.toMoneyValue} <span>{this.state.toCurrency}</span></div>
            </div>  
            <form action="#" className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input"  value={this.state.moneyValue} onChange={this.changeMoneyValue.bind(this)}/>

                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <select className="mdl-textfield__input" name="fromCurrency" onChange={this.changeFromCurrency.bind(this)} value={this.state.fromCurrency}> {currencyOptions} </select>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <select className="mdl-textfield__input" name="fromCurrency" onChange={this.changeToCurrency.bind(this)} value={this.state.toCurrency}> {currencyOptions} </select>
                </div>
              </div>

            </form>

          </div>
          </div>
       </main>
      </div> 
      );
  }
}
