import React from 'react';
import Card from './card';
import '../Style.css'

const ShowRoom = ({ nfts, onBuyNft }) => {

  return (
    <div className="w-full pb-20 px-5 mt-24 text-xl flex-col md:px-0 flex flex-wrap items-center justify-start">
      <div className="flex md:flex-col md:justify-between md:items-start px-6 max-w-6xl flex-col items-center w-full">
        <div className="flex w-full gap-3 h-full flex-col">
          <div className="flex flex-1">
            <div className="w-full flex max-w-5xl mt-8 flex-1 gap-5 justify-start flex-wrap">
              {nfts.map(nft =>
                <Card
                  key={nft.id}
                  nft={nft}
                  onBuyNft={onBuyNft}>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowRoom;