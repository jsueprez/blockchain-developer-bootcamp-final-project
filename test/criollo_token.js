const CriolloToken = artifacts.require("CriolloToken");
let { catchRevert } = require("./exceptionsHelpers.js");

contract("CriolloToken", function (accounts) {

    let instance;
    const tokenName = "Criollo Token";
    const symbol = "CRI";
    const initBaseURI = "someURI";
    const [owner, otherUser] = accounts;

    beforeEach(async () => {
        instance = await CriolloToken.new(tokenName, symbol, initBaseURI, { from: owner });
    });

    it('has an name, symbol and initBaseURI', async function () {
        expect(await instance.name()).to.equal(tokenName);
        expect(await instance.symbol()).to.equal(symbol);
        //expect(await instance._initBaseURI).to.equal(initBaseURI);
    });

    describe("Criollo minting process", () => {

        it("should revert when someone who is not the contract owner try to mint tokens", async () => {
            await catchRevert(instance.safeMint(1, { from: otherUser }));
        })

        it("should the contract owner be able to mint any token", async () => {
            await instance.safeMint(1, { from: owner })
            const tokensMinted = await instance.balanceOf(owner);

            assert.equal(1, tokensMinted, "The owner should be able to Mint any tokens");
        })

        it("should a token get a price and a State equal to NotListed when minted", async () => {
            await instance.safeMint(1, { from: owner })
            const tokensMinted = await instance.balanceOf(owner);
            const state = await instance.state(0);

            assert.equal(1, tokensMinted, "The owner should be able to Mint any tokens");
            assert.equal(0, state, "The state of the token should be Not Listed");
        })

    })

    describe("Criollo listing a token for sale", () => {
        before(async () => {
            await instance.safeMint(1, { from: owner });
        })

        it("should revert if the contract owner try to list a non-exiting token for sale ", async () => {
            await catchRevert(instance.listTokenForSale(0));
        })

        it("should revert if someone else who is not the contract owner try to list a token for sale", async () => {
            await catchRevert(instance.listTokenForSale(0, { from: otherUser }));
        })

        it("should the contract owner be able to list tokens for sale", async () => {
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0);
            const state = await instance.state(0);

            assert.equal(1, state, "The state of the token should be ForSale");
        })

    })

    describe("WorkFlow Users buying process", () => {
        it("should revert when users try to buy a token that does not exist", async () => {
            await catchRevert(instance.buy(1, { from: otherUser, value: 1 }));
        })

        /*it("should revert when users try to use buy function to trade a token", async () => {
            await catchRevert(instance.buy(1, { from: owner, value: priceOfContractOwner }));
        })*/

        it("should revert when users try to buy a token that is not for sale", async () => {
            await instance.safeMint(1, { from: owner });
            await catchRevert(instance.buy(0, { from: otherUser, value: 1 }));
        })

        it("should revert when not enough value is sent when purchasing a token", async () => {
            const priceOfOtherUser = 0;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });

            await catchRevert(instance.buy(0, { from: otherUser, value: priceOfOtherUser }));
        })

        it("should set state to SoldAndLocked after token been sold and been transfer to new owner", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await instance.buy(0, { from: otherUser, value: priceOfOtherUser })

            const state = await instance.state(0);
            const newOwner = await instance.ownerOf(0);

            assert.equal(2, state, "The state of the token should be SoldAndLocked");
            assert.equal(newOwner, otherUser, "The token should be own by the otherUser");
        })
    })

    describe("WorkFlow Criollo shipping the chocolate", () => {

        it("should revert when try to markAsShipped a token which does not exist", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await instance.buy(0, { from: otherUser, value: priceOfOtherUser })
            await catchRevert(instance.markAsShipped(1, { from: owner }));
        })

        it("should revert when try to markAsShipped a token which is not SoldAndLocked", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await catchRevert(instance.markAsShipped(1, { from: owner }));
        })

        it("should revert when otherUser try to markAsShipped a token", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await catchRevert(instance.markAsShipped(0, { from: otherUser }));
        })

        it("should be able to markAsShipped a token which was sold to an user", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await instance.buy(0, { from: otherUser, value: priceOfOtherUser })
            await instance.markAsShipped(0, { from: owner });

            const state = await instance.state(0);
            assert.equal(3, state, "The state of the token should be SoldAndShipped");
        })
    })

    /*describe("WorkFlow Users unlocking the token", () => {

        it("should revert when try to Unlock a token which is not shipped", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await instance.buy(0, { from: otherUser, value: priceOfOtherUser })
            await instance.markAsShipped(1, { from: owner });
        })

        it("should revert when try to markAsShipped a token which is not SoldAndLocked", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await catchRevert(instance.markAsShipped(1, { from: owner }));
        })

        it("should revert when otherUser try to markAsShipped a token", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await catchRevert(instance.markAsShipped(0, { from: otherUser }));
        })

        it("should be able to markAsShipped a token which was sold to an user", async () => {
            const priceOfOtherUser = 1;
            await instance.safeMint(1, { from: owner });
            await instance.listTokenForSale(0, { from: owner });
            await instance.buy(0, { from: otherUser, value: priceOfOtherUser })
            await instance.markAsShipped(0, { from: owner });

            const state = await instance.state(0);
            assert.equal(3, state, "The state of the token should be SoldAndShipped");
        })


    })*/

})