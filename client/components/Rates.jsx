/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { FullContainerExpandable, HalfContainer } from './styles.jsx';
import RatesHeader from './Rates/RatesHeader.jsx';
import LoanType from './Rates/LoanType.jsx';
import CreditScore from './Rates/CreditScore.jsx';
import Loans from './Rates/Loans.jsx';

const Rates = (props) => {
  const {
    handleUserSubmit, loanType, loanTypes, credit, cost, rates,
  } = props;

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <RatesHeader
        setIsExpanded={setIsExpanded}
        loanType={loanType}
        credit={credit}
      />
      <FullContainerExpandable isExpanded={isExpanded}>
        <HalfContainer>
          <LoanType
            loanType={loanType}
            loanTypes={loanTypes}
            handleUserSubmit={handleUserSubmit}
          />
        </HalfContainer>
        <HalfContainer>
          <CreditScore
            credit={credit}
            handleUserSubmit={handleUserSubmit}
          />
        </HalfContainer>
      </FullContainerExpandable>
      <Loans
        cost={cost}
        rates={rates}
      />
      {/* view all rates footer */}
    </div>
  );
};

export default Rates;
