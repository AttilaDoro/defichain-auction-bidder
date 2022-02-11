import React from 'react';
import Button from '@mui/material/Button';
import GavelRounded from '@mui/icons-material/GavelRounded';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import './SearchAuctions.css';

const SearchAuctions = ({
  handleInputChange,
  setAuctionNum,
  minMargin,
  setMinMargin,
  getAuctions,
  auctionNum,
  isGetAuctionsLoading,
}) => (
  <div className="search-auctions">
    <div className="api-inputs">
      <TextField
        className="num-of-auctions"
        type="number"
        id="outlined-basic"
        label="Aukciók száma"
        variant="outlined"
        defaultValue={auctionNum}
        disabled={isGetAuctionsLoading}
        onChange={event => handleInputChange(event.target.value, setAuctionNum)}
      />
      <ToggleButtonGroup
        color="primary"
        value={minMargin}
        exclusive
        disabled={isGetAuctionsLoading}
        onChange={(event, newMinMargin) => handleInputChange(newMinMargin, setMinMargin)}
      >
        <ToggleButton value="1">1%</ToggleButton>
        <ToggleButton value="2">2%</ToggleButton>
        <ToggleButton value="3">3%</ToggleButton>
        <ToggleButton value="4">4%</ToggleButton>
        <ToggleButton value="5">5%</ToggleButton>
      </ToggleButtonGroup>
    </div>
    <Button
      variant="outlined"
      size="large"
      startIcon={<GavelRounded />}
      endIcon={<GavelRounded />}
      sx={{ fontWeight: 'bold' }}
      disabled={isGetAuctionsLoading}
      onClick={() => {
        getAuctions(auctionNum, minMargin);
      }}
    >
      Megnézem vannak-e jó aukciók
    </Button>
  </div>
);

export default SearchAuctions;
