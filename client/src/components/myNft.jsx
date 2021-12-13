import React, { Component } from 'react';
import ShowRoom from './common/showRoom';

const MyNft = ({ nfts, onBuyNft }) => {
  return (
    <ShowRoom
      nfts={nfts}
      onBuyNft={onBuyNft} >

    </ShowRoom>
  );
}

export default MyNft;
