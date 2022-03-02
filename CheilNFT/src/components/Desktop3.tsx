import React, { Component, useEffect, useState, useCallback } from 'react'
import '../assets/style/Style.css'
// import { useEthers, useEtherBalance } from "@usedapp/core";
import image1 from '../assets/image/desktop3/image1.png'
import Line3 from '../assets/image/desktop3/Line3.png'
import {Link} from 'react-router-dom'
import Vector from '../assets/image/desktop3/Vector.png'
import { ttestabi } from '../sol/ttestabi'
import { ethers } from 'ethers';
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../connector";
import { createWatchProgram } from 'typescript'

declare let window: any;
function Desktop3() {
    const [account, setAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const { chainId, library, activate, active } = useWeb3React();
    const [arr, setArr] = useState([""]);
    const [nftimg , setimg] = useState([""]);
    const [nftname , setname] = useState([""]);
    //     const { activateBrowserWallet, account } = useEthers();
    //   const etherBalance = useEtherBalance(account);

    //   function handleConnectWallet() {
    //     activateBrowserWallet();
    //   }

// const arr = ["Galaxy Fold History NFT #25","Galaxy Fold History NFT #25","Galaxy Fold History NFT #25","Galaxy Fold History NFT #25","Galaxy Fold History NFT #25","Galaxy Fold History NFT #25",];
    const activateWallet = async () =>{        
        try{
            await activate(injectedConnector);   
        }catch(e){
            console.log(e)
        }
        
      }

      const handleIsActive = useCallback(() => {
        console.log("connected");

        
        let metaProvider = window.ethereum;

        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.send('eth_requestAccounts');
            metaProvider = window.ethereum;
        } else if (window.web3) {
            metaProvider = window.web3.currentProvider;
        } else {
            throw new Error('No web3 provider detected');
        }

        const provider = new ethers.providers.Web3Provider(metaProvider);

        let signer = provider.getSigner();
        
        signer.getAddress().then((result: any) => {
            console.log(result);
            setAccount(result);
            getCollection();

        })

      }, [active])


    const getCollection = async () =>{
        const signer = library?.getSigner().connectUnchecked();        
        const nftToken = new ethers.Contract("0x2f2F0638987effD1E5f040AeaD6C8F0C68c2ab5b", ttestabi, signer);  
        console.log(signer);        
        
        console.log(account);
        
        nftToken.balanceOf(account).then(async (balance:any) => {
        
            console.log(balance);
            let total = parseInt(balance.toString());            
            console.log(total);
            let temp = [];
            let tempImg = [];
            let tempName = [];
            for(let i = 0; i < total; ++i){                
                let tokenId = await nftToken.tokenOfOwnerByIndex(account, i);      
                console.log(tokenId.toString());
                let nft = await nftToken.tokenURI(tokenId);
                let url = "https://gateway.pinata.cloud/ipfs/" + nft.substr(7);
                console.log(url);
                const response = await fetch(url);                
                const json = await response.json();
                console.log(json);
                if(json.image != undefined){
                    //console.log(json);
                    temp.push(tokenId.toString());
                    tempImg.push("https://gateway.pinata.cloud/ipfs/" + json.image.substr(7));
                    tempName.push(json.name);
                }
                
            }

            setArr(temp);
            setimg(tempImg);            
            setname(tempName);
        });
    }

    useEffect(() => {
        if (isLoading == false) {            
            
            setArr([]);


            activateWallet();  
            setIsLoading(true);
        }


        handleIsActive()


    }, [handleIsActive]);


    // function handleChange  (e:any)  {  // <- input값으로 text 변경 함수
    //     console.log(e.target.value);
    //     setAccount(e.target.value)
    //     // this.setState({
    //     //   text: e.target.value,
    //     // });
    // };

    // const arr = ["Galaxy Fold History NFT #25","Galaxy Fold History NFT #27","Galaxy Fold History NFT #45","Galaxy Fold History NFT #205","Galaxy Fold History NFT #207","Galaxy Fold History NFT #302"];
    return (
        <div>
            <div className='main'>
                <div><div className='D3Rectangle17'>
                    <div className='D3Group21'>
                        <div className='D3fluent2'>
                            <img src={Vector} />
                            <text className='D3address2'>
                                    { account &&
                                        `${account.slice(0, 6)}...${account.slice(
                                            account.length - 4,
                                            account.length
                                        )}`} 
                            </text>
                        </div>
                    </div>
                </div>
                    <div className='main2'>
                        <text className='D3title'>
                            My Wallet
                        </text>
                    </div>
                </div>



                <div className='tmp'>



                <div className='testMAIN'>


                    {arr.map((el, index) => (
                            
                        <Link to={{pathname: '/5', state: {title: el}}} style={{ textDecoration: 'none'}}>
                        <div className="test">


                           <div className='D3Rectangle10'>


                               <img className='D3image4' src={nftimg[index]} />
                               <img className='D3Line3' src={Line3} />

                               <div className='CollectionWrapper'>
                                    <text className='D3text1'>
                                        <tr key={index}>{nftname[index]} #{el}</tr>
                                    </text>
                               </div>

                           </div>


                        </div>
                        </Link>
                    ))}


                </div>
                    


                </div>
                
            </div>
        </div>
    )
}

export default Desktop3