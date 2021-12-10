import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="w-56">
        <div className="rounded-lg bg-white flex flex-col shadow-md cursor-pointer hover:shadow-2xl" style={{ height: '570px' }}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img className="rounded-img" src={"https://ipfs.io/ipfs/QmfZ7BC8iJ3viAEfHsiDR7pmmXCGWSmDTUXFQTwwHqByhy/1.png"} style={{ width: '250px', height: '417px' }} alt="art" />
          </a>
          <div className="flex text-black pb-2.5 px-4 w-full bg-white rounded-b-lg flex-col">
            <div className="flex py-1 items-center justify-between">
              <span className="text-black fs-6">
                ID
              </span>
              <span className="text-black fs-6">
                1
              </span>
            </div>
            <div className="flex py-0 items-center justify-between">
              <span className="text-black fs-6">
                URI
              </span>
              <span className="text-black fs-6">
                1
              </span>
            </div>
            <div className="flex py-0 items-center justify-between">
              <span className="text-black fs-6">
                OWNER
              </span>
              <span className="text-black fs-6">
                1
              </span>
            </div>
          </div>
          <div className="flex flex-col mx-auto py-2">
            {0
              ? <button
                type="Success"
                className="btn btn-block  "
                style={{ border: '1px ridge #111111', color: "#8B8B8B", width: '180px' }}
                // onClick={(e) => buyNft(this.props.dispatch, nft.id, nft.price)}
                disabled
              >
                <b>S o l d</b>
              </button>
              : <button
                type="Success"
                className="btn btn-block btn-outline "
                style={{ border: '1px ridge #12d39d', color: "#12d39d", width: '180px' }}
              // onClick={(e) => buyNft(this.props.dispatch, nft.id, nft.price)}
              >
                <b>B u y</b>
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Card;