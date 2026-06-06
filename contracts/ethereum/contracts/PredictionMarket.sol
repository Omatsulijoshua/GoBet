// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PredictionMarket {
    struct Market {
        uint256 id;
        string question;
        uint256 endTimestamp;
        bool isResolved;
        bool outcome;
        uint256 yesPool;
        uint256 noPool;
    }

    uint256 public marketCount;
    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => uint256)) public yesBets;
    mapping(uint256 => mapping(address => uint256)) public noBets;

    address public owner;

    event MarketCreated(uint256 id, string question, uint256 endTimestamp);
    event BetPlaced(uint256 marketId, address bettor, bool isYes, uint256 amount);
    event MarketResolved(uint256 marketId, bool outcome);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createMarket(string memory _question, uint256 _endTimestamp) external onlyOwner {
        marketCount++;
        markets[marketCount] = Market({
            id: marketCount,
            question: _question,
            endTimestamp: _endTimestamp,
            isResolved: false,
            outcome: false,
            yesPool: 0,
            noPool: 0
        });

        emit MarketCreated(marketCount, _question, _endTimestamp);
    }

    function placeBet(uint256 _marketId, bool _isYes) external payable {
        Market storage market = markets[_marketId];
        require(block.timestamp < market.endTimestamp, "Market has ended");
        require(!market.isResolved, "Market already resolved");
        require(msg.value > 0, "Bet amount must be greater than 0");

        if (_isYes) {
            market.yesPool += msg.value;
            yesBets[_marketId][msg.sender] += msg.value;
        } else {
            market.noPool += msg.value;
            noBets[_marketId][msg.sender] += msg.value;
        }

        emit BetPlaced(_marketId, msg.sender, _isYes, msg.value);
    }

    function resolveMarket(uint256 _marketId, bool _outcome) external onlyOwner {
        Market storage market = markets[_marketId];
        require(!market.isResolved, "Market already resolved");

        market.isResolved = true;
        market.outcome = _outcome;

        emit MarketResolved(_marketId, _outcome);
    }

    function claimWinnings(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        require(market.isResolved, "Market not yet resolved");

        uint256 payout = 0;
        if (market.outcome) {
            uint256 betAmount = yesBets[_marketId][msg.sender];
            require(betAmount > 0, "No winning bets");
            yesBets[_marketId][msg.sender] = 0; // Prevent re-entrancy

            // Calculate share of total pool
            payout = (betAmount * (market.yesPool + market.noPool)) / market.yesPool;
        } else {
            uint256 betAmount = noBets[_marketId][msg.sender];
            require(betAmount > 0, "No winning bets");
            noBets[_marketId][msg.sender] = 0;

            payout = (betAmount * (market.yesPool + market.noPool)) / market.noPool;
        }

        (bool success, ) = msg.sender.call{value: payout}("");
        require(success, "Transfer failed");
    }
}
