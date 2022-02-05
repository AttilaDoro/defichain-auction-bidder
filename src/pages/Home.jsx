import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import GavelRounded from '@mui/icons-material/GavelRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import './Home.css';
import context from '../state/context';
import AuctionCard from '../components/AuctionCard';

const Home = () => {
  const { getAuctions, isGetAuctionsLoading, auctions } = useContext(context);
  const {
    REACT_APP_CLIENT_ENDPOINT_URL: clientEndpointUrl,
    REACT_APP_BLOCK_DELTA: blockDelta,
    REACT_APP_MY_WALLET_ADDRESS: myWalletAddress,
  } = process.env;

  return (
    <div className="home">
      {
        !isGetAuctionsLoading && (
          <Button
            variant="outlined"
            size="large"
            startIcon={<GavelRounded />}
            endIcon={<GavelRounded />}
            loading={isGetAuctionsLoading ? 'true' : 'false'}
            sx={{ fontWeight: 'bold' }}
            onClick={() => {
              getAuctions();
            }}
          >
            Megnézem vannak-e jó aukciók
          </Button>
        )
      }
      {
        isGetAuctionsLoading && <LoadingButton loading variant="outlined" size="large" />
      }
      <div className="auction-cards">
        {
          auctions.length > 0 && auctions.map(({
            url,
            minBidDusd,
            reward,
            diff,
            margin,
            maxBlockNumber,
            bidToken,
            maxPrice,
            minBid,
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
              clientEndpointUrl={clientEndpointUrl}
              blockDelta={blockDelta}
              myWalletAddress={myWalletAddress}
              minBid={minBid}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Home;
