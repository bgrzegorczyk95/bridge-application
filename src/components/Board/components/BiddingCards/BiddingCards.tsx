import React from 'react';
import { colorTypes } from '../../../../assets/img/colors';
import { BiddingCard, BiddingCardsContent, BiddingCardsWrapper, CardValue, DoubledCard, Img, PassCard, RedoubledCard } from './BiddingCardsStyles';

interface Props {
  biddingHistory: any;
  place: string;
}

const splitBiddings = (biddingHistory: any = []) => {
  const biddings = { N: [], S: [], E: [], W: [] };

  biddingHistory.forEach((bid: any) => {
    biddings[bid.place].push(bid);
  });

  return biddings;
};

export const BiddingCards = ({ biddingHistory, place }: Props) => {
  const biddings = splitBiddings(biddingHistory);
  return (
    <BiddingCardsWrapper>
      {Object.keys(biddings).map((bidList: any) => (
        <BiddingCardsContent
          key={bidList}
          playerPosition={place || bidList}
          bidPlace={bidList}
          margin={biddings[bidList].length * 30}
        >
          {biddings[bidList]?.map((bid: any, i) => (
            <BiddingCard
              key={i}
              pass={bid?.pass}
              x={bid?.doubled}
              xx={bid?.redoubled}
              color={bid.colorName}
              top={20 + (i * 40)}
            >
              {bid?.value && (
                <CardValue color={bid.colorName}>
                  {bid.value}
                  {bid.colorName !== 'NT' ? <Img src={colorTypes[bid.colorName]} alt="color" /> : 'NT'}
                </CardValue>
              )}
              {bid?.pass && <PassCard>PASS</PassCard>}
              {bid?.doubled && <DoubledCard>X</DoubledCard>}
              {bid?.redoubled && <RedoubledCard>XX</RedoubledCard>}
            </BiddingCard>
          ))}
        </BiddingCardsContent>
      ))}
    </BiddingCardsWrapper>
  );
};
