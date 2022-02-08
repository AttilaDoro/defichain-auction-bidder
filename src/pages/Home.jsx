import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import GavelRounded from '@mui/icons-material/GavelRounded';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import BigNumber from 'bignumber.js';
import './Home.css';
import context from '../state/context';
import AuctionCard from '../components/AuctionCard';
import CustomPagination from '../components/CustomPagination';
import TokenCheckboxes from '../components/TokenCheckboxes';
import { giveAllCheckboxesTheSameValue } from '../utils';

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
  if (firstAuction.maxBlockNumber < secondAuction.maxBlockNumber) return -1;
  if (firstAuction.maxBlockNumber > secondAuction.maxBlockNumber) return 1;
  return sortByMargin(firstAuction, secondAuction);
};

const handleInputChange = (newValue, setNewValue) => {
  setNewValue(newValue);
};

const Home = () => {
  const {
    REACT_APP_CLIENT_ENDPOINT_URL: clientEndpointUrl,
    REACT_APP_BLOCK_DELTA: blockDelta,
    REACT_APP_MY_WALLET_ADDRESS: myWalletAddress,
    REACT_APP_PAGE_SIZE,
  } = process.env;
  const pageSize = parseInt(REACT_APP_PAGE_SIZE, 10);
  const { getAuctions, isGetAuctionsLoading, auctions } = useContext(context);
  const [sortBy, setSortBy] = useState('time');
  const [minMargin, setMinMargin] = useState('2');
  const [auctionNum, setAuctionNum] = useState('500');
  const [page, setPage] = useState(1);
  const [nonTokenCheckboxes, setNonTokenCheckboxes] = useState({ all: false, none: false });
  const tokens = [...new Set(auctions.map(({ bidToken }) => bidToken))];
  tokens.sort();
  const availableTokens = giveAllCheckboxesTheSameValue(tokens, true);
  const [selectedTokens, setSelectedTokens] = useState({});
  auctions.sort((firstAuction, secondAuction) => sortAuctions(firstAuction, secondAuction, sortBy));
  const filteredAuctions = auctions.filter(({ bidToken }) => selectedTokens[bidToken]);
  const numOfPages = Math.ceil(filteredAuctions.length / pageSize);
  const numOfPageElements = pageSize * page;
  const auctionsOnPage = filteredAuctions.slice(numOfPageElements - pageSize, numOfPageElements);

  useEffect(() => {
    setSelectedTokens(availableTokens);
  }, [JSON.stringify(availableTokens)]);

  return (
    <div className="home">
      {
        !isGetAuctionsLoading && (
          <div className="api-inputs">
            <TextField
              className="num-of-auctions"
              type="number"
              id="outlined-basic"
              label="Aukciók száma"
              variant="outlined"
              defaultValue="500"
              onChange={event => handleInputChange(event.target.value, setAuctionNum)}
            />
            <ToggleButtonGroup
              color="primary"
              value={minMargin}
              exclusive
              onChange={(event, newMinMargin) => handleInputChange(newMinMargin, setMinMargin)}
            >
              <ToggleButton value="1">1%</ToggleButton>
              <ToggleButton value="2">2%</ToggleButton>
              <ToggleButton value="3">3%</ToggleButton>
            </ToggleButtonGroup>
          </div>
        )
      }
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
              getAuctions(auctionNum, minMargin);
            }}
          >
            Megnézem vannak-e jó aukciók
          </Button>
        )
      }
      {
        filteredAuctions.length > 1 && !isGetAuctionsLoading && (
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
        auctions.length > 1 && !isGetAuctionsLoading && (
          <TokenCheckboxes
            tokens={tokens}
            selectedTokens={selectedTokens}
            setSelectedTokens={setSelectedTokens}
            nonTokenCheckboxes={nonTokenCheckboxes}
            setNonTokenCheckboxes={setNonTokenCheckboxes}
          />
        )
      }
      {
        isGetAuctionsLoading && <CircularProgress />
      }
      {
        filteredAuctions.length > pageSize && (
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
      {
        filteredAuctions.length > pageSize && (
          <CustomPagination
            numOfPages={numOfPages}
            page={page}
            setPage={setPage}
          />
        )
      }
    </div>
  );
};

export default Home;
