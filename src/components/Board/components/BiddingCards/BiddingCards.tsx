import { Bid } from '../../../../@types/types';
import { colorTypes } from '../../../../assets/img/colors';
import { BiddingCard, BiddingCardsContent, BiddingCardsWrapper, CardValue, DoubledCard, Img, PassCard, RedoubledCard } from './BiddingCardsStyles';

interface Props {
  biddingHistory: Bid[];
  place: string;
}

const splitBiddings = (biddingHistory: Bid[] = []) => {
  const biddings: any = { N: [], S: [], E: [], W: [] };

  biddingHistory.forEach((bid: Bid) => {
    biddings[bid.place].push(bid);
  });

  return biddings;
};

export const BiddingCards = ({ biddingHistory, place }: Props) => {
  const biddings = splitBiddings(biddingHistory);

  return (
    <BiddingCardsWrapper>
      {Object.keys(biddings).map((bidList) => (
        <BiddingCardsContent
          key={bidList}
          playerPosition={place || bidList}
          bidPlace={bidList}
          margin={biddings[bidList].length * 30}
        >
          {biddings[bidList]?.map((bid: Bid, i: number) => (
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
