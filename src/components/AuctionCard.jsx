/* eslint-disable max-len */
import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import './AuctionCard.css';

// eslint-disable-next-line react/jsx-props-no-spreading
const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const handleClose = (reason, setOpenAlert) => {
  if (reason === 'clickaway') return;
  setOpenAlert(false);
};

const getConfigData = ({
  clientEndpointUrl,
  maxBlockNumber,
  blockDelta,
  urlChunks,
  myWalletAddress,
  bidToken,
  minBidNum,
  maxPriceNum,
}) => `CLIENT_ENDPOINT_URL=${clientEndpointUrl}
MAX_BLOCK_NUMBER=${maxBlockNumber}
BLOCK_DELTA=${blockDelta}
VAULT_ID=${urlChunks[4]}
BATCH_INDEX=${urlChunks[6]}
MY_WALLET_ADDRESS=${myWalletAddress}
BID_TOKEN=${bidToken}
MIN_BID=${minBidNum.multipliedBy('1.05').decimalPlaces(8, BigNumber.ROUND_CEIL).toFixed(8)}
MAX_BID=${maxPriceNum.decimalPlaces(8, BigNumber.ROUND_CEIL).toFixed(8)}`;

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
  const [wasClicked, setWasClicked] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const minBidDusdNum = new BigNumber(minBidDusd);
  const rewardNum = new BigNumber(reward);
  const diffNum = new BigNumber(diff);
  const marginNum = new BigNumber(margin);
  const maxPriceNum = new BigNumber(maxPrice);
  const minBidNum = new BigNumber(minBid);
  return (
    <Card
      className="auction-card"
      sx={{
        backgroundColor: !wasClicked ? '#f8f8f8' : '#519a52',
        transition: 'background-color 0.5s ease-out',
      }}
    >
      <div
        role="button"
        tabIndex={0}
        className="card-content"
        onClick={() => {
          setTimeout(() => {
            setWasClicked(false);
          }, 500);
          setWasClicked(true);
          setOpenAlert(true);
          const urlChunks = url.split('/');
          navigator.clipboard.writeText(getConfigData({
            clientEndpointUrl,
            maxBlockNumber,
            blockDelta,
            urlChunks,
            myWalletAddress,
            bidToken,
            minBidNum,
            maxPriceNum,
          }));
        }}
      >
        <Typography variant="body1" align="left" gutterBottom>{`Minimum összeg: ${minBidDusdNum.toPrecision(10)} dUSD`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Nyeremény: ${rewardNum.toPrecision(10)} dUSD`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Profit: ${diffNum.toPrecision(7)} dUSD`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Margin: ${marginNum.toPrecision(4)}%`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Aukció vége: ${maxBlockNumber}`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Token: ${bidToken}`}</Typography>
      </div>
      <Link href={url} target="_blank" rel="noopener noreferrer">Aukció megnyitása</Link>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={(event, reason) => handleClose(reason, setOpenAlert)}
      >
        <Alert
          onClose={(event, reason) => handleClose(reason, setOpenAlert)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Adatok a vágólapra másolva
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AuctionCard;
