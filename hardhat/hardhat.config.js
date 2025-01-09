require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "^0.8.20",

  // defaultNetwork: "localhost",
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545"
    // },
    sepolia: {
      url:"https://eth-sepolia.g.alchemy.com/v2/VBlWNt9u00tReOSz5N3lc7j4FFmJ2eCt",
      accounts:["8fca3f2069a38c2581d0f55c2809dd397a84732d21d1e6e4eb2cbca5f7a30de2"]
        }
  },
  solidity: "0.8.20",
};