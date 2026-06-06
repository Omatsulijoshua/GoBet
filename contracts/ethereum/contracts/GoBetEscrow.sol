// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract GoBetEscrow is ReentrancyGuard, Ownable, Pausable {
    
    struct Bet {
        uint256 id;
        address bettor;
        uint256 amount;
        string matchId;
        string selectedOutcome;
        uint256 potentialPayout;
        bool isResolved;
        bool isWinner;
    }

    mapping(uint256 => Bet) public bets;
    mapping(address => uint256) public userBalances;
    
    uint256 public nextBetId;
    
    event BetPlaced(uint256 indexed betId, address indexed bettor, uint256 amount, string matchId);
    event BetResolved(uint256 indexed betId, bool isWinner, uint256 payout);
    event WinningsWithdrawn(address indexed bettor, uint256 amount);
    event Deposit(address indexed user, uint256 amount);

    constructor() Ownable() {}

    // Deposit funds into the platform
    function deposit() external payable whenNotPaused {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        userBalances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Place a bet using deposited funds
    function placeBet(
        string memory _matchId,
        string memory _selectedOutcome,
        uint256 _amount,
        uint256 _potentialPayout
    ) external whenNotPaused {
        require(_amount > 0, "Bet amount must be greater than 0");
        require(userBalances[msg.sender] >= _amount, "Insufficient balance");

        userBalances[msg.sender] -= _amount;

        uint256 betId = nextBetId++;
        bets[betId] = Bet({
            id: betId,
            bettor: msg.sender,
            amount: _amount,
            matchId: _matchId,
            selectedOutcome: _selectedOutcome,
            potentialPayout: _potentialPayout,
            isResolved: false,
            isWinner: false
        });

        emit BetPlaced(betId, msg.sender, _amount, _matchId);
    }

    // Admin resolves the bet
    function resolveBet(uint256 _betId, bool _isWinner) external onlyOwner {
        Bet storage bet = bets[_betId];
        require(!bet.isResolved, "Bet is already resolved");
        
        bet.isResolved = true;
        bet.isWinner = _isWinner;

        if (_isWinner) {
            userBalances[bet.bettor] += bet.potentialPayout;
        }

        emit BetResolved(_betId, _isWinner, _isWinner ? bet.potentialPayout : 0);
    }

    // User withdraws their funds
    function withdraw(uint256 _amount) external nonReentrant {
        require(userBalances[msg.sender] >= _amount, "Insufficient balance");
        
        userBalances[msg.sender] -= _amount;
        
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed");

        emit WinningsWithdrawn(msg.sender, _amount);
    }

    // Emergency controls
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
