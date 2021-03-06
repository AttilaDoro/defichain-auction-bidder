/* eslint-disable max-len */
import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoRounded from '@mui/icons-material/InfoRounded';
import './AuctionCard.css';

// eslint-disable-next-line react/jsx-props-no-spreading
const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const handleClose = (reason, setOpenAlert) => {
  if (reason === 'clickaway') return;
  setOpenAlert(false);
};

const getConfigData = ({
  urlChunks,
  bidToken,
  minBidNum,
  maxPriceNum,
  startingBidRaise,
  newBidRaise,
}) => `{
  vaultId: '${urlChunks[4]}',
  batchIndex: ${urlChunks[6]},
  bidToken: '${bidToken}',
  newBidRaise: '${newBidRaise}',
  minBid: '${minBidNum.multipliedBy(startingBidRaise).decimalPlaces(8, BigNumber.ROUND_CEIL).toFixed(8)}',
  maxBid: '${maxPriceNum.decimalPlaces(8, BigNumber.ROUND_CEIL).toFixed(8)}',
},`;

const getRemainingTime = (blocks) => {
  const blocksRemaining = blocks * 30;
  const h = Math.floor(blocksRemaining / 3600);
  const m = Math.floor((blocksRemaining % 3600) / 60);
  const hDisplay = h > 0 ? `${h}h` : '0h';
  const mDisplay = m >= 0 ? `${m.toString().padStart(2, '0')}m` : '';
  return `~${hDisplay} ${mDisplay}`;
};

const AuctionCard = ({
  url,
  minBidDusd,
  reward,
  diff,
  margin,
  maxBlockNumber,
  bidToken,
  maxPrice,
  minBid,
  currentBlock,
}) => {
  const [wasClicked, setWasClicked] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const minBidDusdNum = new BigNumber(minBidDusd);
  const rewardNum = new BigNumber(reward);
  const diffNum = new BigNumber(diff);
  const marginNum = new BigNumber(margin);
  const maxPriceNum = new BigNumber(maxPrice);
  const minBidNum = new BigNumber(minBid);
  const blocksRemaining = BigNumber.max(maxBlockNumber - currentBlock, 0).toNumber();
  const {
    REACT_APP_STARTING_BID_RAISE: startingBidRaise,
    REACT_APP_NEW_BID_RAISE: newBidRaise,
  } = process.env;

  const urlChunks = url.split('/');
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
          navigator.clipboard.writeText(getConfigData({
            urlChunks,
            bidToken,
            minBidNum,
            maxPriceNum,
            startingBidRaise,
            newBidRaise,
          }));
        }}
      >
        <Typography variant="body1" align="left" gutterBottom>{`Minimum ??sszeg: ${minBidDusdNum.toPrecision(10)} dUSD`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Nyerem??ny: ${rewardNum.toPrecision(10)} dUSD`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Profit: ${diffNum.toPrecision(7)} dUSD`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Margin: ${marginNum.toPrecision(4)}%`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Aukci?? v??ge: ${maxBlockNumber}`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Token: ${bidToken}`}</Typography>
        <Typography variant="body1" align="left" gutterBottom>{`Id??: ${getRemainingTime(blocksRemaining)} (${blocksRemaining} blokk)`}</Typography>
        <Tooltip title={`${urlChunks[4]}/${urlChunks[6]}`} arrow>
          <InfoRounded />
        </Tooltip>
      </div>
      <Link href={url} target="_blank" rel="noopener noreferrer">Aukci?? megnyit??sa</Link>
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
          Adatok a v??g??lapra m??solva
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AuctionCard;
