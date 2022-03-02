import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
//import { KaikasConnector } from "kaikas-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/516f946979bc4fa187edcdc164e0bac0",
  3: "https://ropsten.infura.io/v3/516f946979bc4fa187edcdc164e0bac0",
  4: "https://rinkeby.infura.io/v3/516f946979bc4fa187edcdc164e0bac0",
  5: "https://goerli.infura.io/v3/516f946979bc4fa187edcdc164e0bac0",
  42: "https://kovan.infura.io/v3/516f946979bc4fa187edcdc164e0bac0",
  1001: "https://api.baobab.klaytn.net:8651",
  8217: "https://api.cypress.ozys.net:8651"
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    1001, //Baobab
    8217, //Cypress
  ],
})

// export const kaikasConnector = new KaikasConnector({
//   supportedChainIds: [
//     1001, //Baobab
//     8217, //Cypress
//   ]
// })

export const networkConnector = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 3: RPC_URLS[3], 1001: RPC_URLS[1001], 8217: RPC_URLS[8217] },
  defaultChainId: 1001,
  pollingInterval: POLLING_INTERVAL
});