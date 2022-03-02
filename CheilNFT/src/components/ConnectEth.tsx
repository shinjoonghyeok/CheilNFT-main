import React, { Component, useEffect, useState } from 'react'

import { ethers } from 'ethers';

import Vector1 from '../assets/image/desktop3/Vector1.png'
import { useWeb3React } from "@web3-react/core";

import "../assets/style/Style.css"
import Web3 from 'web3';


import { injectedConnector } from "../connector";
import { ttestabi } from '../sol/ttestabi';
export interface ConnectEthprop {
  signer: ethers.providers.JsonRpcProvider;
}

declare let window: any;
function ConnectEth() {
  let web3: Web3;

  const { connector, activate, deactivate, active } = useWeb3React();

  const [isApprove, setIsApprove] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const { chainId, library } = useWeb3React();
  const [account, setAccount] = useState("");
  const [balancec, setBalance] = useState("");
  const [tokenid, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isLoading == false){      
      activateWallet();
      setupinfo();     
      setIsLoading(true);
    }
    
  });
  
  const setupinfo = async () => {
    const signer = library?.getSigner().connectUnchecked();
    const nftToken = new ethers.Contract("0x7029C3A4D4F7E0000ba1f23e4884881dc06B396F", ttestabi, signer);
    const account = await signer.getAddress()
    let tokenid = await nftToken.totalSupply();
    let balancec = await nftToken.balanceOf(account);
    setAccount(account.toString());
    setBalance(balancec.toString());
    setToken(tokenid.toString());
  }

  const activateWallet = async () =>{
    let metaProvider;
    if (typeof window.ethereum !== 'undefined') {

      await window.ethereum.send('eth_requestAccounts');
      metaProvider = window.ethereum;
    } else if (window.web3) {
      metaProvider = window.web3.currentProvider;
    } else {
      throw new Error('No web3 provider detected');
    }

    const provider = new ethers.providers.Web3Provider(metaProvider);
    const signer = await provider.getSigner();

    const account2 = await signer.getAddress();
    setAccount(account2);
    activate(injectedConnector);   
  }

  const onClickActivate = async () => {
    activateWallet();
  };

  return account ? (
    <div className='Rectangle4'>
      <div className='Group12' >
        <div className='fluent1' >
          <img src={Vector1} />
          <text className='address1'>
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
              )}`}
          </text>
        </div>
      </div>
    </div>
  ) : (
    <div className='Rectangle4'>
      <div className='Group12' >
        <div className='fluent1' >
          <div className='fluent1' >
            <img src={Vector1} />
            <button onClick={onClickActivate} className='address1'>Connectwallet</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectEth