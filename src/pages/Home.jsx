import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GavelRounded from '@mui/icons-material/GavelRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import context from '../state/context';

const Home = () => {
  const { getAuctions, isGetAuctionsLoading } = useContext(context);
  const width = 500;
  return (
    <>
      <Card sx={{ maxWidth: width, margin: '30px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
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
    </>
  );
};

export default Home;
