import React from 'react';
import { useParams } from 'react-router-dom';

const AuctionList = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>AUCTIONS</div>
  );
};

export default AuctionList;
