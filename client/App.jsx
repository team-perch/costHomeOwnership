/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CostInputs from './components/CostInputs.jsx';
import Rates from './components/Rates.jsx';
import { formatLoan, unFormatLoan } from './utils';

const Container = styled.div`
  max-width: 667px;
  font-family: Libre Franklin;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyId: props.id,
      zipCode: '',
      redfinCostEstimate: null,
      insuranceRate: null,
      propertyTaxRate: null,
      cost: 10,
      loanType: formatLoan(30, 'Fixed'),
      loanTypes: [],
      downPay: 20,
      credit: 740,
      origYear: 2019,
      rates: [],
    };

    this.handleUserSubmit = this.handleUserSubmit.bind(this);
  }

  componentDidMount() {
    const { propertyId } = this.state;
    this.getPropertyData(propertyId);
  }

  async getPropertyData(id) {
    try {
      const res = await axios.get(`/api/costHomeOwnership/properties?id=${id}`);
      const {
        propertyId,
        zipCode,
        redfinCostEstimate,
        insuranceRate,
        propertyTaxRate,
      } = await res.data[0];

      this.setState({
        propertyId,
        zipCode,
        redfinCostEstimate,
        insuranceRate,
        propertyTaxRate,
        cost: redfinCostEstimate,
      }, this.getRates);
    } catch (err) {
      console.log(err);
    }
  }

  async getRates() {
    const {
      cost, zipCode, loanType, downPay, credit, origYear,
    } = this.state;

    const { term, type } = unFormatLoan(loanType);

    const queries = {
      cost, zipCode, term, type, downPay, credit, origYear,
    };

    const queryString = Object.keys(queries)
      .map((k) => `${k}=${queries[k]}`)
      .join('&');

    try {
      const res = await axios.get(`/api/costHomeOwnership/rates?${queryString}`);
      const rates = await res.data;

      // TODO - change to server supplying available loanTypes in getPropertyData
      let loanTypes = new Set();
      rates.forEach((rate) => {
        loanTypes.add(formatLoan(rate.term, rate.loanType));
      });
      loanTypes = [...loanTypes];

      this.setState({ rates, loanTypes });
    } catch (err) {
      console.log(err);
    }
  }

  handleUserSubmit(stateKey, stateVal) {
    this.setState({ [stateKey]: stateVal }, this.getRates);
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      rates,
      // eslint-disable-next-line no-unused-vars
      insuranceRate,
      // eslint-disable-next-line no-unused-vars
      propertyTaxRate,
      loanType,
      loanTypes,
      credit,
      cost,
      downPay,
      redfinCostEstimate,
    } = this.state;

    return (
      <Container>
        <CostInputs
          key={cost * downPay}
          handleUserSubmit={this.handleUserSubmit}
          cost={cost}
          downPay={downPay}
          redfinCostEstimate={redfinCostEstimate}
        />
        <Rates
          // add key
          handleUserSubmit={this.handleUserSubmit}
          loanType={loanType}
          loanTypes={loanTypes}
          credit={credit}
        />
      </Container>
    );
  }
}

export default App;
