let BN = web3.utils.BN;
const CriolloToken = artifacts.require("CriolloToken");
let { catchRevert } = require("./exceptionsHelpers.js");

contract("CriolloToken", function (accounts) {

    let instance;
    const tokenName = "Criollo Token";
    const symbol = "CRI";
    const initBaseURI = "someURI";
    const [owner, alice, bob] = accounts;
    const initialPrice = 1;
    const emptyAddress = "0x0000000000000000000000000000000000000000";

    beforeEach(async () => {
        instance = await CriolloToken.new(tokenName, symbol, initBaseURI, { from: owner });
    });

    it('has an name, symbol and initBaseURI', async function () {
        expect(await instance.name()).to.equal(tokenName);
        expect(await instance.symbol()).to.equal(symbol);
        //expect(await instance._initBaseURI).to.equal(initBaseURI);
    });

    describe("Criollo minting process,,,,", () => {

        it("should revert when someone who is not the contract owner try to mint tokens", async () => {
            await catchRevert(instance.safeMint(initialPrice, { from: alice }));
        })

        it("should the contract owner be able to mint any token", async () => {
            await instance.safeMint(initialPrice, { from: owner })

            const newToken = await instance.getCriollo.call(0);

            assert.equal(
                newToken[1].toString(10),
                initialPrice,
                'the price of the last added token does not match the expected value',
            );

            assert.equal(
                newToken[2].toString(10),
                CriolloToken.State.NotListed,
                'the state of the token should be "Not Listed"',
            );

            assert.equal(
                newToken[3],
                owner,
                "the address minting the token should be listed as the token owner",
            );
        })

        it("should emit a NewTokenMinted event when an token is minted", async () => {
            let eventEmitted = false;
            const tx = await instance.safeMint(initialPrice, { from: owner });
            if (tx.logs[1].event == "NewTokenMinted") {
                eventEmitted = true;
            }

            assert.equal(
                eventEmitted,
                true,
                "minting an token should emit a Minting event",
            );
        });
    })

    describe("Criollo listing a token to MarketPlace...", () => {
        const listingPrice = 2;

        beforeEach(async () => {
            await instance.safeMint(initialPrice, { from: owner });
        })

        it("should revert if the token owner try to list a non-exiting token for sale ", async () => {
            await catchRevert(instance.addToMarketPlace(1, listingPrice));
        })

        it("should revert if an user try to list a token which does not own to the market place", async () => {
            await catchRevert(instance.addToMarketPlace(0, listingPrice, { from: alice }));
        })

        it("should update the state accordingly when a token is listed succesfully to the market place", async () => {

            await instance.addToMarketPlace(0, listingPrice, { from: owner });

            const token = await instance.getCriollo.call(0);

            assert.equal(
                token[2].toString(10),
                CriolloToken.State.ForSale,
                'the state of the token should be "For Sale"',
            );

            assert.equal(
                token[1].toString(10),
                listingPrice,
                'the price of the token should be 2'
            );
        })
    })

    describe("Alice buying a token in the MarketPlace...", () => {
        const listingPrice = 2;

        beforeEach(async () => {
            await instance.safeMint(initialPrice, { from: owner });
            await instance.safeMint(initialPrice, { from: owner });
            await instance.addToMarketPlace(0, listingPrice, { from: owner });
        })

        it("should revert when users try to buy a token that does not exist", async () => {
            await catchRevert(instance.buy(1, { from: alice, value: 1 }));
        })

        it("should revert when users try to buy a token that is not for sale", async () => {
            await catchRevert(instance.buy(1, { from: alice, value: 1 }));
        })

        it("should revert when not enough value is sent when purchasing a token", async () => {
            const priceOfalice = 1;
            await catchRevert(instance.buy(0, { from: alice, value: priceOfalice }));
        })

        it("should allow someone to purchase a token and update state accordingly when the token owner is Criollo", async () => {
            const priceOfalice = "2";

            var ownerBalanceBefore = await web3.eth.getBalance(owner);
            var aliceBalanceBefore = await web3.eth.getBalance(alice);

            await instance.buy(0, { from: alice, value: priceOfalice })

            var ownerBalanceAfter = await web3.eth.getBalance(owner);
            var aliceBalanceAfter = await web3.eth.getBalance(alice);

            const token = await instance.getCriollo.call(0);

            assert.equal(
                token[2].toString(10),
                CriolloToken.State.Locked,
                'the state of the item should be "Locked"',
            );

            assert.equal(
                token[3].toString(10),
                alice,
                'the new token owner should be alice',
            );

            assert.equal(
                new BN(ownerBalanceAfter).toString(),
                new BN(ownerBalanceBefore).add(new BN(priceOfalice)).toString(),
                "owner's balance should be increased by the price of the item",
            );

            assert.isBelow(
                Number(aliceBalanceAfter),
                Number(new BN(aliceBalanceBefore).sub(new BN(priceOfalice))),
                "alice's balance should be reduced by more than the price of the item (including gas costs)",
            );
        })
    })

    describe("Criollo shipping the chocolate...", () => {
        const listingPrice = 2;
        const priceOfalice = "2";

        beforeEach(async () => {
            await instance.safeMint(initialPrice, { from: owner });
            await instance.addToMarketPlace(0, listingPrice, { from: owner });
            await instance.buy(0, { from: alice, value: priceOfalice })
        })

        it("should revert when try to ship a token which does not exist", async () => {
            await catchRevert(instance.shipped(1, { from: owner }));
        })

        it("should revert when try to ship a token which is not SoldAndLocked", async () => {
            await catchRevert(instance.shipped(1, { from: owner }));
        })

        it("should revert when alice or bob try to ship a token", async () => {
            await catchRevert(instance.shipped(0, { from: alice }));
            await catchRevert(instance.shipped(0, { from: bob }));
        })

        it("should be able to ship a token which was sold to bob and update state accordingly", async () => {
            await instance.shipped(0, { from: owner });

            const token = await instance.getCriollo.call(0);

            assert.equal(
                token[2].toString(10),
                CriolloToken.State.Shipped,
                'the state of the item should be "Shipped"',
            );
        })
    })

    describe("Alice unlocking the token when receiving the physical asset...", () => {
        const listingPrice = 2;
        const priceOfalice = 2;

        beforeEach(async () => {
            await instance.safeMint(initialPrice, { from: owner });
            await instance.safeMint(initialPrice, { from: owner });
            await instance.addToMarketPlace(0, listingPrice, { from: owner });
            await instance.addToMarketPlace(1, listingPrice, { from: owner });
            await instance.buy(0, { from: alice, value: priceOfalice })
            await instance.buy(1, { from: alice, value: priceOfalice })
            await instance.shipped(0, { from: owner });
        })

        it("should revert when try to Unlock a token which is not shipped", async () => {
            await catchRevert(instance.unlockToken(1, { from: alice }));
        })

        it("should revert when try to Unlock a token when your are not the token owner", async () => {
            await catchRevert(instance.unlockToken(0, { from: bob }));
        })

        it("should be able to Unlock when received and update the state accordingly", async () => {
            await instance.unlockToken(0, { from: alice });

            const token = await instance.getCriollo.call(0);

            assert.equal(
                token[2].toString(10),
                CriolloToken.State.Unlocked,
                'the state of the item should be "Unlocked"',
            );
        })
    })

    describe("Bob buying an Alice's token...", () => {
        const listingPrice = 2;
        const priceOfalice = 2;

        beforeEach(async () => {
            await instance.safeMint(initialPrice, { from: owner });
            await instance.safeMint(initialPrice, { from: owner });
            await instance.addToMarketPlace(0, listingPrice, { from: owner });
            await instance.addToMarketPlace(1, listingPrice, { from: owner });
            await instance.buy(0, { from: alice, value: priceOfalice })
            await instance.buy(1, { from: alice, value: priceOfalice })
            await instance.shipped(0, { from: owner });
            await instance.shipped(1, { from: owner });
            await instance.unlockToken(0, { from: alice });
        })

        it("should revert when Bob try to buy a token to Alice and the token is not Unlocked", async () => {
            await catchRevert(instance.buy(1, { from: bob, value: listingPrice }));
        })

        it("should allow Bob to buy a token to Alice and update state accordingly", async () => {

            var bobBalanceBefore = await web3.eth.getBalance(bob);
            var aliceBalanceBefore = await web3.eth.getBalance(alice);

            await instance.buy(0, { from: bob, value: priceOfalice })

            var bobBalanceAfter = await web3.eth.getBalance(bob);
            var aliceBalanceAfter = await web3.eth.getBalance(alice);

            const token = await instance.getCriollo.call(0);

            assert.equal(
                token[2].toString(10),
                CriolloToken.State.Unlocked,
                'the state of the item should stay "Unlocked"',
            );

            assert.equal(
                token[3].toString(10),
                bob,
                'the new token owner should be bob',
            );

            assert.equal(
                new BN(aliceBalanceAfter).toString(),
                new BN(aliceBalanceBefore).add(new BN(priceOfalice)).toString(),
                "alice's balance should be increased by the price of the item",
            );

            assert.isBelow(
                Number(bobBalanceAfter),
                Number(new BN(bobBalanceBefore).sub(new BN(priceOfalice))),
                "bob's balance should be reduced by more than the price of the item (including gas costs)",
            );
        })
    })
})