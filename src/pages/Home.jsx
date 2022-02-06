import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import GavelRounded from '@mui/icons-material/GavelRounded';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BigNumber from 'bignumber.js';
import './Home.css';
import context from '../state/context';
import AuctionCard from '../components/AuctionCard';

const handleChange = ({ target }, setSortBy) => {
  setSortBy(target.value);
};

const sortByMargin = (firstAuction, secondAuction) => {
  const firstMargin = new BigNumber(firstAuction.margin);
  const secondMargin = new BigNumber(secondAuction.margin);
  if (firstMargin.isGreaterThan(secondMargin)) return -1;
  if (secondMargin.isGreaterThan(firstMargin)) return 1;
  return 0;
};

const sortAuctions = (firstAuction, secondAuction, sortBy) => {
  if (sortBy === 'margin') return sortByMargin(firstAuction, secondAuction);
  if (sortBy === 'profit') {
    const firstProfit = new BigNumber(firstAuction.diff);
    const secondProfit = new BigNumber(secondAuction.diff);
    if (firstProfit.isGreaterThan(secondProfit)) return -1;
    if (secondProfit.isGreaterThan(firstProfit)) return 1;
    return 0;
  }
  if (firstAuction.maxBlockNumber > secondAuction.maxBlockNumber) return -1;
  if (firstAuction.maxBlockNumber < secondAuction.maxBlockNumber) return 1;
  return sortByMargin(firstAuction, secondAuction);
};

const Home = () => {
  const [sortBy, setSortBy] = useState('time');
  const { getAuctions, isGetAuctionsLoading, auctions } = useContext(context);
  const {
    REACT_APP_CLIENT_ENDPOINT_URL: clientEndpointUrl,
    REACT_APP_BLOCK_DELTA: blockDelta,
    REACT_APP_MY_WALLET_ADDRESS: myWalletAddress,
  } = process.env;
  auctions.sort((firstAuction, secondAuction) => sortAuctions(firstAuction, secondAuction, sortBy));

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
        auctions.length > 1 && (
          <FormControl className="sort-by">
            <InputLabel id="demo-simple-select-label">Rendezés</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Rendezés"
              onChange={event => handleChange(event, setSortBy)}
            >
              <MenuItem value="time">Idő</MenuItem>
              <MenuItem value="margin">Margin</MenuItem>
              <MenuItem value="profit">Profit</MenuItem>
            </Select>
          </FormControl>
        )
      }
      {
        isGetAuctionsLoading && <CircularProgress />
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
