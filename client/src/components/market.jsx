import React from 'react';
import ShowRoom from './common/showRoom';

const Market = ({ nfts, onBuyNft }) => {
  return (
    <ShowRoom
      nfts={nfts}
      onBuyNft={onBuyNft}
    >
    </ShowRoom>
  );
}

export default Market;