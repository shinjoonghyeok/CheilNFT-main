import React, { Component, useState, useCallback, useEffect } from 'react'
import '../assets/style/Style.css'

import image3 from '../assets/image/desktop4/image2.png'
import Line17 from '../assets/image/desktop4/Line17.png'
import Polygon1 from '../assets/image/desktop4/Polygon1.png'
import Polygon2 from '../assets/image/desktop4/Polygon2.png'
import Line5 from '../assets/image/desktop4/Line5.png'
import Line6 from '../assets/image/desktop4/Line6.png'
import Line7 from '../assets/image/desktop4/Line7.png'
import Line8 from '../assets/image/desktop4/Line8.png'
import Line9 from '../assets/image/desktop4/Line9.png'
import babycarriage from '../assets/image/desktop4/babycarriage.png'

import { Link, useLocation } from 'react-router-dom'

import { injectedConnector } from "../connector";

import Vector3 from '../assets/image/desktop4/Vector.png'
// import { useEthers, useEtherBalance } from "@usedapp/core";

import Web3 from 'web3';


import { ethers } from 'ethers';
import { useWeb3React } from "@web3-react/core";
import { ttestabi } from "../sol/ttestabi";

import { ConnectEthprop } from './ConnectEth';
import { cachedDataVersionTag } from 'v8';

interface LocationState {

    title: string;

}



declare let window: any;
function Desktop4() {
    let web3: Web3;
    const [account, setAccount] = useState("");
    const [nftimg, setimg] = useState([""]);
    const [nftname, setname] = useState([""]);
    const [arr, setArr] = useState([""]);
    const [nftdesc, setdesc] = useState([""]);
    const location = useLocation<LocationState>();
    const [isLoading, setIsLoading] = useState(false);
    const { chainId, library, activate, active } = useWeb3React();


    const getHistory = async () => {
        const signer = library?.getSigner().connectUnchecked();
        console.log(signer);
        const nftToken = new ethers.Contract("0x2f2F0638987effD1E5f040AeaD6C8F0C68c2ab5b", ttestabi, signer);
        const account2 = await signer.getAddress();


        nftToken.balanceOf(account2).then(async (balance: any) => {

            console.log(balance);
            let total = parseInt(balance.toString());
            console.log(total);
            let temp = [];
            let tempImg = [];
            let tempName = [];
            let tempDes = [];
            for (let i = 0; i < total; ++i) {

                let tokenId = await nftToken.tokenOfOwnerByIndex(account2, i);
                if (tokenId == location.state.title) {
                    let nft = await nftToken.tokenURI(tokenId);
                    let url = "https://gateway.pinata.cloud/ipfs/" + nft.substr(7);
                    console.log(url);
                    const response = await fetch(url);
                    const json = await response.json();
                    console.log(json);

                    //console.log(json);

                    temp.push(tokenId.toString());
                    tempImg.push("https://gateway.pinata.cloud/ipfs/" + json.image.substr(7));
                    tempName.push(json.name);
                    tempDes.push(json.description);
                }
            }

            setArr(temp);
            setimg(tempImg);
            setname(tempName);
            setdesc(tempDes);
        });

        let log = nftToken.filters.Transfer(null, account2);
        console.log(log);


        library.on(log, (from: any, to: any, amount: any, event: any) => {
            console.log('Transfer|sent', { from, to, amount, event })
            //mutate(undefined, true)
        })

    }


    const activateWallet = async () => {
        try {
            await activate(injectedConnector);
        } catch (e) {
            console.log(e)
        }

    }

    const handleIsActive = useCallback(() => {
        console.log("connected");
        getHistory();
    }, [active])


    useEffect(() => {
        if (isLoading == false) {
            setArr([]);
            activateWallet();

        }


        handleIsActive()


    }, [handleIsActive]);


    return (
        <>
        {arr.map((el, index) => (
                <div>
                    <div className='D4rectangle11' ></div>
                    <img className='D4image3' src={nftimg[index]} />
                    <div className='D4ellipse1' />

                    <text className='D4title2'>
                        {nftname} #{location.state.title}
                    </text>

                    <img className='D4Line17' src={Line17} />
                    <text className='D4des_title'>
                        Description
                    </text>
                    <text className='D4description'>
                        <tr>{nftdesc[index]}</tr>
                    </text>
                    <text className='D4prop_title'>
                        Properties
                    </text>
                    <text className='D4properties'>
                        <tr>Benefit #1 - Next Round Whitelisting Ticket</tr>
                        <tr>Benefit #2- Real Product Event Lottery</tr>
                        <tr>Benefit #3- Holders Premium Color Code</tr>
                    </text>

                    <div className='D4Rectangle12'>
                        <text className='D4Details'>
                            Details
                        </text>
                        <img className='D4Polygon1' src={Polygon1} />
                    </div>

                    <div className='D4Group19'>
                        <text className='D4ContractAddress'>
                            ContractAddress
                        </text>
                        <text className='D4ContractAddress_m'>
                            {account}
                        </text>
                        <img className='D4Line5' src={Line5} />
                        <text className='D4TokenID'>
                            Token ID
                        </text>
                        <text className='D4TokenID_m'>
                            {location.state.title}
                        </text>
                        <img className='D4Line6' src={Line6} />
                        <text className='D4TokenStandard'>
                            TokenStandard
                        </text>
                        <text className='D4TokenStandard_m'>
                            ERC721
                        </text>
                        <img className='D4Line7' src={Line7} />
                        <text className='D4lockchain'>
                            Blockchain
                        </text>
                        <text className='D4Blockchain_m'>
                            Ethereum
                        </text>
                        <img className='D4Line8' src={Line8} />
                        <text className='D4Metadata'>
                            Metadata
                        </text>
                        <text className='D4Metadata_m'>
                            Frozen
                        </text>
                        <img className='D4Line9' src={Line9} />
                    </div>


                    <div className='D4Group17'>
                        <div className='D4Rectangle13'>
                            <text className='D4ItemActivity'>
                                Item Activity
                            </text>
                            <img className='D4Polygon2' src={Polygon2} />
                        </div>
                    </div>
                    <div className='D4Rectangle14'>

                        <text className='D4Filter'>
                            Filter
                        </text>
                        <img className='D4Rectangle16' />
                    </div>
                    <div className='D4Rectangle15'>
                        <text className='D4Event'>
                            Event
                        </text>

                        <text className='D4Price'>
                            Price
                        </text>

                        <text className='D4From'>
                            From
                        </text>

                        <text className='D4To'>
                            To
                        </text>

                        <text className='D4Date'>
                            Date
                        </text>

                    </div>
                    <div className='D4Group15'>
                        <img className='D4babycarriage' src={babycarriage} />
                        <text className='D4Event_m'>
                            Minted
                        </text>
                        <text className='D4From_m'>
                            NullAddress
                        </text>
                        <text className='D4To_m'>
                            AE06B3
                        </text>
                        <text className='D4Date_m'>
                            6 days ago
                        </text>
                        <img className='D4Vector3' src={Vector3} />
                        <img className='D4Line16' />
                    </div>
                </div>
                
            ))
            
        }
        </>
    )
}
export default Desktop4