/* eslint-disable import/extensions */
import React, { useState } from 'react';
import {
  FullContainer,
  CarouselContainer,
  CarouselItemsContainer,
  CarouselItems,
  CarouselScrollButton,
  CarouselScrollArrow,
} from '../styles.jsx';
import Loan from './Loan.jsx';
import LoanArrow from './LoanArrow.jsx';
import LoanEmpty from './LoanEmpty.jsx';

const Loans = (props) => {
  const {
    cost,
    rates,
    downPay,
  } = props;
  const ratesCount = rates.length;

  const [rateIdx, setRateIdx] = useState(0);
  const handleScrollClick = (dir) => {
    if (dir === 'left') {
      const nextRateIdx = rateIdx - 2 < 0 ? 0 : rateIdx - 2;
      setRateIdx(nextRateIdx);
    } else {
      const nextRateIdx = rateIdx + 2 > ratesCount - 1
        ? ratesCount - 1
        : rateIdx + 2;
      setRateIdx(nextRateIdx);
    }
  };
  return (
    <FullContainer>
      <CarouselContainer>
        <CarouselItemsContainer>
          <CarouselItems
            idx={rateIdx}
          >
            {ratesCount > 0 && rateIdx < ratesCount
              ? (
                <Loan
                  rate={rates[rateIdx]}
                  cost={cost}
                  downPay={downPay}
                />
              )
              : <LoanEmpty />}
            {ratesCount > 1 && rateIdx + 1 < ratesCount
              ? (
                <Loan
                  rate={rates[rateIdx + 1]}
                  cost={cost}
                  downPay={downPay}
                />
              )
              : ''}
            {/* TODO - animate scrolling */}
            {/* {rates.map((rate) => (
              <Loan key={rate.rateId} rate={rate} cost={cost} />
            ))} */}
          </CarouselItems>
        </CarouselItemsContainer>
        <CarouselScrollButton
          isShown={rateIdx > 0}
          left="true"
          onClick={() => handleScrollClick('left')}
        >
          <CarouselScrollArrow>
            <LoanArrow />
          </CarouselScrollArrow>
        </CarouselScrollButton>
        <CarouselScrollButton
          isShown={rateIdx + 1 < ratesCount}
          onClick={() => handleScrollClick('right')}
        >
          <CarouselScrollArrow>
            <LoanArrow />
          </CarouselScrollArrow>
        </CarouselScrollButton>
      </CarouselContainer>
    </FullContainer>
  );
};

export default Loans;