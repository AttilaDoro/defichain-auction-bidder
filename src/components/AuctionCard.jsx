import React from 'react';
import BigNumber from 'bignumber.js';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import './AuctionCard.css';

const AuctionCard = ({
  url,
  minBidDusd,
  reward,
  diff,
  margin,
  maxBlockNumber,
  bidToken,
  maxPrice,
  clientEndpointUrl,
  blockDelta,
  myWalletAddress,
  minBid,
}) => {
  const minBidDusdNum = new BigNumber(minBidDusd);
  const rewardNum = new BigNumber(reward);
  const diffNum = new BigNumber(diff);
  const marginNum = new BigNumber(margin);
  const maxPriceNum = new BigNumber(maxPrice);
  const minBidNum = new BigNumber(minBid);
  return (
    <Card className="auction-card" sx={{ backgroundColor: '#f8f8f8' }}>
      <div
        role="button"
        tabIndex={0}
        className="card-content"
        onClick={() => {
          const urlChunks = url.split('/');
          navigator.clipboard.writeText(`
            CLIENT_ENDPOINT_URL=${clientEndpointUrl}
            MAX_BLOCK_NUMBER=${maxBlockNumber}
            BLOCK_DELTA=${blockDelta}
            VAULT_ID=${urlChunks[4]}
            BATCH_INDEX=${urlChunks[6]}
            MY_WALLET_ADDRESS=${myWalletAddress}
            BID_TOKEN=${bidToken}
            MIN_BID=${minBidNum.multipliedBy('1.05').toString()}
            MAX_BID=${maxPriceNum.toString()}
          `);
        }}
      >
        <div>{`Minimum összeg: ${minBidDusdNum.toPrecision(10)} dUSD`}</div>
        <div>{`Nyeremény: ${rewardNum.toPrecision(10)} dUSD`}</div>
        <div>{`Profit: ${diffNum.toPrecision(7)} dUSD`}</div>
        <div>{`Margin: ${marginNum.toPrecision(5)} %`}</div>
        <div>{`maxBlockNumber: ${maxBlockNumber}`}</div>
        <div>{`bidToken: ${bidToken}`}</div>
      </div>
      <Link href={url} target="_blank" rel="noopener noreferrer">További adatok</Link>
    </Card>
  );
};

export default AuctionCard;
