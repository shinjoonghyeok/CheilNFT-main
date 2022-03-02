import React from 'react';

import "./assets/style/App.css";
import Web3 from 'web3';
import { ethers } from 'ethers';
import { injectedConnector, networkConnector} from "../connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { useWeb3React } from "@web3-react/core";

import { useState, useEffect } from "react";

// const networkConnector = new NetworkConnector({
//   urls: {
//     1: process.env.RPC_URL_1==undefined?"https://api.baobab.klaytn.net:8651":process.env.RPC_URL_1
//     //1: "https://api.baobab.klaytn.net:8651"
//   },
//   defaultChainId: 1
// });
declare let window: any;
 function App() {
  let web3:Web3;
  
  const { connector, activate, deactivate, active } = useWeb3React();
  //생략

  const [blockNumber, setBlockNumber] = useState(undefined);
  const [account, setAccount] = useState("");
  const {chainId,library } = useWeb3React();

  useEffect(() => {    
    console.log(library);
    if (library) {
      library.getBlockNumber().then((bn:any) => {
        setBlockNumber(bn);
      });
      library.on("block", setBlockNumber);
      return () => {
        library.removeListener("block", setBlockNumber);
        setBlockNumber(undefined);
      };
    }
  }, [library]);
  


  const onClickActivate = async () => {
    
    let metaProvider;
    if (typeof window.ethereum !== 'undefined') {
      // await window.ethereum.enable();
      await window.ethereum.send('eth_requestAccounts');
      metaProvider = window.ethereum;
    } else if (window.web3) {
      metaProvider = window.web3.currentProvider;
    } else {
      throw new Error('No web3 provider detected');
    }

    console.log(metaProvider)

    const provider = new ethers.providers.Web3Provider(metaProvider)
    const signer = await provider.getSigner()

    const networkID = await signer.getChainId()
    const account2 = await signer.getAddress()
    setAccount(account2);
    const connectionUrl = provider.connection.url

    activate(injectedConnector);
    //activate(networkConnector);
    
    
  };
  const onClickDeactivate = () => {
  //  deactivate(connector);
    deactivate();
  };

  return (
    <div className="App">
      <b>Current Block Number: </b>
      {blockNumber}
      <br />
      <p>{account}</p>
      <button onClick={onClickActivate}>activate</button>
      {active && <button onClick={onClickDeactivate}>deactivate</button>}
    </div>
  );
}
export default App;
