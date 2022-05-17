import React, { useContext, useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BigNumber from 'bignumber.js';
import './Home.css';
import context from '../state/context';
import SearchAuctions from '../components/SearchAuctions';
import LeftColumn from '../components/LeftColumn';
import RightColumn from '../components/RightColumn';
import CenterColumn from '../components/CenterColumn';
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
    REACT_APP_PAGE_SIZE,
    REACT_APP_DEFAULT_MARGIN: defaultMargin,
    REACT_APP_DEFAULT_AUCTION_NUM: defaultAuctionNum,
    REACT_APP_DEFAULT_MIN_PROFIT: defaultMinProfit,
  } = process.env;
  const pageSize = parseInt(REACT_APP_PAGE_SIZE, 10);
  const { getAuctions, isGetAuctionsLoading, auctions, currentBlock, getCurrentBlock } = useContext(context);
  const [sortBy, setSortBy] = useState('time');
  const [minMargin, setMinMargin] = useState(defaultMargin);
  const [minProfit, setMinProfit] = useState(defaultMinProfit);
  const [auctionNum, setAuctionNum] = useState(defaultAuctionNum);
  const [page, setPage] = useState(1);
  const [nonTokenCheckboxes, setNonTokenCheckboxes] = useState({ all: true, none: false });
  const [nonBlockCheckboxes, setNonBlockCheckboxes] = useState({ all: true, none: false });
  const tokens = [...new Set(auctions.map(({ bidToken }) => bidToken))];
  const blockNumbers = [...new Set(auctions.map(({ maxBlockNumber }) => maxBlockNumber))];
  tokens.sort();
  blockNumbers.sort();
  const availableTokens = giveAllCheckboxesTheSameValue(tokens, true);
  const availableBlocNumbers = giveAllCheckboxesTheSameValue(blockNumbers, true);
  const [selectedTokens, setSelectedTokens] = useState({});
  const [selectedBlocks, setSelectedBlocks] = useState({});
  auctions.sort((firstAuction, secondAuction) => sortAuctions(firstAuction, secondAuction, sortBy));
  const filteredAuctions = auctions
    .filter(({ bidToken, maxBlockNumber }) => selectedTokens[bidToken] && selectedBlocks[maxBlockNumber]);
  const numOfPages = Math.ceil(filteredAuctions.length / pageSize);
  const numOfPageElements = pageSize * page;
  const auctionsOnPage = filteredAuctions.slice(numOfPageElements - pageSize, numOfPageElements);

  useEffect(() => {
    setSelectedTokens(availableTokens);
    setSelectedBlocks(availableBlocNumbers);
  }, [JSON.stringify(availableTokens)]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (filteredAuctions.length > 0) getCurrentBlock();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [filteredAuctions.length]);

  return (
    <div className="home">
      <SearchAuctions
        handleInputChange={handleInputChange}
        setAuctionNum={setAuctionNum}
        minMargin={minMargin}
        setMinMargin={setMinMargin}
        getAuctions={getAuctions}
        auctionNum={auctionNum}
        isGetAuctionsLoading={isGetAuctionsLoading}
        minProfit={minProfit}
        setMinProfit={setMinProfit}
        getCurrentBlock={getCurrentBlock}
      />
      {isGetAuctionsLoading && <CircularProgress />}
      {!isGetAuctionsLoading && <div className="results">{`Találatok: ${filteredAuctions.length}`}</div>}
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
      <div className="content">
        <LeftColumn
          auctions={auctions}
          isGetAuctionsLoading={isGetAuctionsLoading}
          tokens={tokens}
          selectedTokens={selectedTokens}
          setSelectedTokens={setSelectedTokens}
          nonTokenCheckboxes={nonTokenCheckboxes}
          setNonTokenCheckboxes={setNonTokenCheckboxes}
        />
        <CenterColumn
          filteredAuctions={filteredAuctions}
          isGetAuctionsLoading={isGetAuctionsLoading}
          pageSize={pageSize}
          numOfPages={numOfPages}
          page={page}
          setPage={setPage}
          auctionsOnPage={auctionsOnPage}
          currentBlock={currentBlock}
        />
        <RightColumn
          auctions={auctions}
          isGetAuctionsLoading={isGetAuctionsLoading}
          blockNumbers={blockNumbers}
          selectedBlocks={selectedBlocks}
          setSelectedBlocks={setSelectedBlocks}
          nonBlockCheckboxes={nonBlockCheckboxes}
          setNonBlockCheckboxes={setNonBlockCheckboxes}
        />
      </div>
    </div>
  );
};

export default Home;
