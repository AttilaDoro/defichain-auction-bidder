import React from 'react';
import AuctionCard from './AuctionCard';
import CustomPagination from './CustomPagination';
import './CenterColumn.css';

const CenterColumn = ({
  filteredAuctions,
  isGetAuctionsLoading,
  pageSize,
  numOfPages,
  page,
  setPage,
  auctionsOnPage,
}) => (
  <div className="center-column">
    {
      filteredAuctions.length > pageSize && !isGetAuctionsLoading && (
        <CustomPagination
          numOfPages={numOfPages}
          page={page}
          setPage={setPage}
        />
      )
    }
    <div className="auction-cards">
      {
        auctionsOnPage.length > 0 && !isGetAuctionsLoading && auctionsOnPage.map(({
          url,
          minBidDusd,
          reward,
          diff,
          margin,
          maxBlockNumber,
          bidToken,
          maxPrice,
          minBid,
          myStartingBid,
          myDiff,
          myMargin,
        }) => (
          <AuctionCard
            key={url}
            url={url}
            minBidDusd={minBidDusd}
            reward={reward}
            diff={diff}
            margin={margin}
            maxBlockNumber={maxBlockNumber}
            bidToken={bidToken}
            maxPrice={maxPrice}
            minBid={minBid}
            myStartingBid={myStartingBid}
            myDiff={myDiff}
            myMargin={myMargin}
          />
        ))
      }
    </div>
    {
      filteredAuctions.length > pageSize && !isGetAuctionsLoading && (
        <CustomPagination
          numOfPages={numOfPages}
          page={page}
          setPage={setPage}
        />
      )
    }
  </div>
);

export default CenterColumn;
