import '../assets/style/Desktop3.css'
import '../assets/style/Style.css'

import image2 from '../assets/image/desktop2/image2.png'
import Web3 from 'web3';

import React, { Component, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ethers } from 'ethers';
import { useWeb3React } from "@web3-react/core";
import { ttestabi } from "../sol/ttestabi";

import { ConnectEthprop } from './ConnectEth';
import { cachedDataVersionTag } from 'v8';
import CreatePage from './CreatePage';
import axios from 'axios';

//import * as Pinata from 'pinata-sdk';
//import fs from 'fs';
//const pinata = Pinata.configure('836e5fabfef74179b97a', '9c65e9e80794f9205cc9057693c3d901c22cd6fbc3ff05160c8ad7b92a6a2ec0');


//const pinataSDK = require('@pinata/sdk');
//const pinata = pinataSDK('836e5fabfef74179b97a', '9c65e9e80794f9205cc9057693c3d901c22cd6fbc3ff05160c8ad7b92a6a2ec0');
//const fs = require('fs');


declare let window: any;
function Desktop2(ConnectEthprop: any) {
    let web3: Web3;
    const history = useHistory();

    const { chainId, library } = useWeb3React();

    const [isApprove, setIsApprove] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    
    const [account, setAccount] = useState("");
    const [totalSupply, setTotalSupply] = useState("0");

    const [isLoading, setIsLoading] = useState(false);
    const [ipfsmetadata , setmetadata] = useState("");
    const [des, setdes] = useState("");
    const [name, setname] = useState("");
    const [res,setres] = useState(null || '');
    

    // const signer = ConnectEthprop.signer;

    useEffect(() => {
        if(isLoading == false){            
            //const signer = library?.getSigner().connectUnchecked();
    
            let metaProvider = window.ethereum;
    
            if (typeof window.ethereum !== 'undefined') {
        
                window.ethereum.send('eth_requestAccounts');
                metaProvider = window.ethereum;
            } else if (window.web3) {
                metaProvider = window.web3.currentProvider;
            } else {
                throw new Error('No web3 provider detected');
            }    
            const signer2 = new ethers.providers.Web3Provider(metaProvider);    
            const nftToken = new ethers.Contract("0x2f2F0638987effD1E5f040AeaD6C8F0C68c2ab5b", ttestabi, signer2);
    
            // //  let setApprove = await nftToken.setApprovalForAll("0x6c7579444c36443a4a866F302860176332ffD317", true);
            nftToken.totalSupply().then((result: any) => {                
                setTotalSupply(result.toString());
            });
            setIsLoading(true);
        }
        
    });



    const minting = async () => {
        setApproveLoading(true);

        
        let ipfs = "ipfs://QmXFc37HbNttJUGU9xpXECAgfcrLQv9ma3fg3498Z5p7G2";        
        console.log(ipfs);

        
        const signer = library?.getSigner().connectUnchecked();
        const account2 = await signer.getAddress();

        const nftToken = new ethers.Contract("0x2f2F0638987effD1E5f040AeaD6C8F0C68c2ab5b", ttestabi, signer);
        //  let setApprove = await nftToken.setApprovalForAll("0x6c7579444c36443a4a866F302860176332ffD317", true);
        let tokenid = await nftToken.totalSupply();

        // let json = 
        // {
        //     "attributes" : [],
        //     "description" : "The world's most adorable.",
        //     "image" : "ipfs://QmVcWTxPGb14g9VGEcvUquWFSGsEXrhnuWvMif13ULULfd",
        //     "name" : "Galaxy Fold History NFT #" + tokenid.toString()
        // }   

        
        
        let minttoken = await nftToken.mintWithTokenURI(account2.toString(), tokenid.toString(), ipfs, { gasLimit: 500000 });

        setApproveLoading(false);

        history.push("/4");

    }

    return (
        <div>

            <div>
                <text className='D2Title'>
                    Galaxy Fold History NFT
                </text>
            </div>
            <div>
                <text className='D2SubMessage'>
                    보유 시 Galaxy Z flip 4 사전 판매 선정의 혜택을 드립니다!
                </text>
            </div>
            <div>
                <text className='D2Count'>
                    {totalSupply} / 1000
                    <img className='D2Line3' />
                </text>
                <img className='D2image2' src={image2} />
                
                <div className='D2Rectangle2'>
                    <button onClick={minting} className='D2messageWhite'>
                        드롭
                    </button>
                </div>                
            </div>
        </div>
    )
};

export default Desktop2