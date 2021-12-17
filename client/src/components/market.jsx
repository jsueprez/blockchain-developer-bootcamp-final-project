import React from 'react';
import ShowRoom from './common/showRoom';

const Market = ({ nfts, onBuyNft }) => {
  return (
    nfts.length > 0 ?
      <ShowRoom
        nfts={nfts}
        onBuyNft={onBuyNft}
      >
      </ShowRoom>
      : <div className="w-full pb-20 px-5 mt-24 text-xl flex-col md:px-0 flex flex-wrap items-center justify-start">
        <h1>There are not NFTs available</h1>
      </div>
  );
}

export default Market;