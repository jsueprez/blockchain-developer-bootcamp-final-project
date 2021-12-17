import React, { Component } from 'react';
import eth from '../../images/eth.png'
import cocoaBlack from '../../images/cocoa_icon_black.png'
import cocoaWhite from '../../images/cocoa_icon_white.png'
import cocoaGreen from '../../images/cocoa_icon_green.png'

class Card extends Component {

  getTextState(state) {
    if (state === '0') return 'Not listed'
    if (state === '1') return 'Buy'
    if (state === '2') return 'Locked'
    if (state === '3') return 'Unlock Nft'
    if (state === '4') return 'Unlocked'
  }

  raiseNftAction = (id, price, state) => {
    if (state === 'Buy') {
      console.log('buying')
      this.props.onBuyNft(id, price);
    }
    if (state === 'Unlock Nft') {
      console.log('unlocking')
      this.props.onUnlockNft(id);
    }

  }

  renderCardButton() {
    const { id, price, state } = this.props.nft;
    const label = this.getTextState(state);

    let buttonEnable = 'button-disable disabled';
    if (label === 'Buy' || label === 'Unlock Nft') buttonEnable = ' btn-danger button-enable '

    return (
      <button
        type="Success"
        className={`btn ${buttonEnable}`}
        onClick={() => this.raiseNftAction(id, price, this.getTextState(state))}
      >
        {label}
      </button>
    );
  }

  renderCardPrice(iconPath, value) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-between">
            <div className="flex self-end items-center gap-1">
              <span className="font-bold text-sm">Price</span>
              <div className="flex gap-1 items-center">
                <img className="h-3" alt="ETH" src={iconPath} />
                <span className="text-sm font-semibold">{value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCardTitle(title, id) {
    return (
      <div className="flex py-2 items-center justify-between">
        <span className="text-black text-xl">
          {`${title} #${id}`}
        </span>
        {this.renderCocoaIcon()}
      </div>
    );
  }

  renderCocoaIcon() {
    const { attributes } = this.props.nft;
    let cocoaIcon = '';
    if (attributes.background === 'dark') cocoaIcon = cocoaBlack;
    if (attributes.background === 'light') cocoaIcon = cocoaWhite;
    if (attributes.background === 'green') cocoaIcon = cocoaGreen;
    return <img alt="preview" className="w-9" src={cocoaIcon} />;
  }


  render() {
    const { nft } = this.props;
    return (
      <div className="w-56">
        <div className="rounded-lg bg-white flex flex-col shadow-md cursor-pointer hover:shadow-2xl" style={{ height: '570px' }}>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img className="rounded-img" src={nft.image} style={{ width: '250px', height: '417px' }} alt="art" />
          </a>
          <div className="flex text-black pb-2.5 px-4 w-full bg-white rounded-b-lg flex-col">
            {this.renderCardTitle('CRIOLLO', nft.id)}
            {this.getTextState(nft.state) === 'Buy' ? this.renderCardPrice(eth, nft.price) : ''}
          </div>
          <div className="flex flex-col mx-auto py-4">
            {this.renderCardButton(nft.state)}
          </div>
        </div>
      </div >
    );
  }
}

export default Card;