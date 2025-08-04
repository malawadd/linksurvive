# LinkSurvive

<h1 align="center">
  <br>
  <a href=""><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpP08WXrpiC7unhN0oDo8qp_DUua5vDX9MPHLrMF54imsowsaIu3-deazJ3TBUkHFTjEGJc6MGm6QA7aftuWdffOVzOug4gBpEacGKm6ACAkXoPFXQPzXedJmZwyj8XlXrBfaHR0yRUr-fYlqk5nAXJGx4m4fSffogKzWsnomYyWqL0-9B0xzh8NqtDW8/s960/our%20Goal.png" width="300"></a>
  <br>
  LinkSurvive
  <br>
</h1>

<h4 align="center">Survive Waves, Compete in Tournaments, Win Rewards - All On-Chain!</h4>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#local-deployment">Local Deployment</a> •
  <a href="#smart-contracts">Smart Contracts</a> •
  <a href="#license">License</a>
</p>



## Introduction 

LinkSurvive is an innovative isometric tower defense game built on Etherlink, combining strategic gameplay with blockchain technology. Players defend against waves of enemies while earning rewards, competing in tournaments, and building their on-chain reputation. This isn't just a game; it's a competitive gaming ecosystem where skill meets blockchain rewards.

## Key Features

1. **Competitive Tournaments:** Join scheduled tournaments with real XTZ prize pools. Compete against other players and let the community vote for winners to earn additional rewards.

2. **NFT Integration:** Mint unique survival NFTs that represent your in-game achievements and provide special gameplay benefits.

3. **On-Chain Leaderboards:** Track your progress with persistent leaderboards stored on-chain, showcasing top players across different difficulties and time periods.

4. **Voting & Rewards System:** Participate in tournament voting where correct predictions earn you a share of the reward pool - making spectating as rewarding as playing.

5. **Strategic Tower Defense:** Experience classic isometric tower defense gameplay with modern mechanics, multiple difficulty levels, and wave-based progression.

6. **Etherlink Integration:** Built on Etherlink for fast, low-cost transactions while maintaining full decentralization and security.

## Local Deployment

### Prerequisites
- Node.js 18+
- Git

### Setup

1. **Clone and install dependencies**
```bash
cd linksurvive
npm install
```

2. **Setup Convex backend**
```bash
npx convex dev
```

3. **Configure environment**
```bash
cp .env.example .env
# Fill in your Convex URL and other required variables
```

4. **Start the development server**
```bash
npm run start
```

The game will be available at `http://localhost:9999/`

## Smart Contracts

### Etherlink Testnet Deployments

- **NFT Contract:** [0xAe467A4CfCe5310C50E2b2A1ad30768A02155fAC](https://testnet-explorer.etherlink.com/address/0xAe467A4CfCe5310C50E2b2A1ad30768A02155fAC)
- **Tournament Contract:** *Coming Soon*

### Contract Features
- **NFT Minting:** Players can mint survival NFTs representing their achievements
- **Tournament System:** Smart contracts manage tournament registration, scoring, and rewards


## How to Play

1. **Connect Wallet:** Connect your Etherlink-compatible wallet
2. **Mint NFT:** Optional - mint a survival NFT for enhanced gameplay
3. **Join Tournament:** Participate in active tournaments for prize pools
4. **Play & Compete:** Survive waves of enemies and climb the leaderboard


## Technology Stack

- **Frontend:** React, TypeScript, Phaser.js
- **Backend:** Convex (real-time database)
- **Blockchain:** Etherlink
- **Smart Contracts:** Solidity
- **Wallet Integration:** Wagmi, ConnectKit

## License

MIT
