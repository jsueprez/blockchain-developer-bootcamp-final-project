import React, { Component } from 'react';
import './Style.css'

class Market extends React.Component {
  render() {
    return (

      <div className="w-full pb-20 px-5 mt-24 text-xl flex-col md:px-0 flex flex-wrap items-center justify-start">


        <div className="flex md:flex-col md:justify-between md:items-start px-6 max-w-6xl flex-col items-center w-full">
          <div className="flex w-full gap-3 h-full flex-col">

            <div className="flex flex-1">
              <div className="w-full flex max-w-5xl mt-8 flex-1 gap-5 justify-start flex-wrap">
                <div className="w-56">
                  <div className="rounded-lg bg-white flex flex-col shadow-md cursor-pointer hover:shadow-2xl" style={{ height: '450px' }}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <img className="rounded-img" src={"https://ipfs.io/ipfs/QmdEqL11hbeou7YYddK2BE5EmTBCkBKUMp1FenZF5AJpY3/1.png"} style={{ width: '200px', height: '300px' }} alt="art" />
                    </a>
                    <div className="flex text-black pb-2.5 px-4 w-full bg-white rounded-b-lg flex-col">
                      <div className="flex py-1 items-center justify-between">
                        <span className="text-black text-xl">
                          ID
                        </span>
                        <span className="text-black text-xl">
                          1
                        </span>
                      </div>
                      <div className="flex py-1 items-center justify-between">
                        <span className="text-black text-xl">
                          URI
                        </span>
                        <span className="text-black text-xl">
                          1
                        </span>
                      </div>
                      <div className="flex py-1 items-center justify-between">
                        <span className="text-black text-xl">
                          OWNER
                        </span>
                        <span className="text-black text-xl">
                          1
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col mx-auto py-1">
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


              </div>
            </div>
          </div>
        </div>
      </div>

      // <div>
      //   <h1 className="m-4">Buy your NFT here and give a try to the best chocolate in the world</h1>
      //   <div className="container m-4">
      //     <div className="row gx-5 m-3">
      //       <div className="col" style={{ border: '1mm ridge #8B8B8B', borderRadius: '15px', width: '200px' }}>
      //         <a href="#" target="_blank" rel="noopener noreferrer">
      //           <img src={"https://ipfs.io/ipfs/QmdEqL11hbeou7YYddK2BE5EmTBCkBKUMp1FenZF5AJpY3/1.png"} style={{ width: '200px', height: '300px' }} alt="art" />
      //         </a>
      //         <table style={{ width: '200px' }}>
      //           <thead>
      //             <tr>
      //               <th className="text-left" style={{ color: "#8B8B8B" }}>ID: </th>
      //               <th style={{ color: "#FFFFFF" }}>1</th>
      //             </tr>
      //           </thead>
      //           <tbody>
      //             <tr>
      //               <th className="text-left" style={{ color: "#8B8B8B" }}>URI: </th>
      //               <td>
      //                 <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: "#55FF55" }}>
      //                   link
      //                 </a>
      //               </td>
      //             </tr>
      //             {0
      //               ? <tr>
      //                 <th className="text-left" style={{ color: "#8B8B8B" }}>Owner:</th>
      //                 <th>
      //                   {/* <img
      //                     alt="id"
      //                     className="ml-2 id border border-success"
      //                     width="15"
      //                     height="15"
      //                     src={`data:image/png;base64,${new Identicon(this.props.nftState[nft.id], 30).toString()}`}
      //                   />{' '} */}
      //                   <a
      //                     href="#"
      //                     target="_blank"
      //                     rel="noopener noreferrer"
      //                     style={{ color: "#55FF55", "fontWeight": "normal" }}
      //                   >
      //                     {1}
      //                   </a>
      //                 </th>
      //               </tr>
      //               : <tr>
      //                 <th className="text-left" style={{ color: "#8B8B8B" }}>Price: </th>
      //                 <th style={{ color: "#FFFFFF" }}>{8} ETH</th>
      //               </tr>
      //             }
      //           </tbody>
      //         </table><p></p>
      //         {1
      //           ? <button
      //             type="Success"
      //             className="btn btn-block"
      //             style={{ border: '1px ridge #8B8B8B', color: "#8B8B8B", width: '200px' }}
      //             // onClick={(e) => buyNft(this.props.dispatch, nft.id, nft.price)}
      //             disabled
      //           >
      //             <b>S o l d</b>
      //           </button>
      //           : <button
      //             type="Success"
      //             className="btn btn-block btn-outline"
      //             style={{ border: '1px ridge #55FF55', color: "#55FF55", width: '200px' }}
      //           // onClick={(e) => buyNft(this.props.dispatch, nft.id, nft.price)}
      //           >
      //             <b>B u y</b>
      //           </button>
      //         }

      //       </div>
      //       <div className="col">
      //         <a href="#" target="_blank" rel="noopener noreferrer">
      //           <img src={"https://ipfs.io/ipfs/QmdEqL11hbeou7YYddK2BE5EmTBCkBKUMp1FenZF5AJpY3/2.png"} style={{ border: '1mm ridge #8B8B8B', width: '200px', height: '300px' }} alt="art" />
      //         </a>
      //       </div>
      //       <div className="col">
      //         <a href="#" target="_blank" rel="noopener noreferrer">
      //           <img src={"https://ipfs.io/ipfs/QmdEqL11hbeou7YYddK2BE5EmTBCkBKUMp1FenZF5AJpY3/3.png"} style={{ border: '1mm ridge #8B8B8B', width: '200px', height: '300px' }} alt="art" />
      //         </a>
      //       </div>

      //       <div className="col">
      //         <a href="#" target="_blank" rel="noopener noreferrer">
      //           <img src={"https://ipfs.io/ipfs/QmdEqL11hbeou7YYddK2BE5EmTBCkBKUMp1FenZF5AJpY3/4.png"} style={{ border: '1mm ridge #8B8B8B', width: '200px', height: '300px' }} alt="art" />
      //         </a>
      //       </div>

      //     </div >


      //   </div >

      // </div >


    );
  }
}

export default Market;