import React, { useEffect, useState } from 'react';

import '../assets/style/Style.css'

import image1 from '../assets/image/desktop1/image1.png'
import mainImg1 from '../assets/image/desktop1/mainImg1.png'
import mainImg2 from '../assets/image/desktop1/mainImg2.png'
import mainImg3 from '../assets/image/desktop1/mainImg3.png'
import mainImg4 from '../assets/image/desktop1/mainImg4.png'
import Dropzone from 'react-dropzone'
import MyPage from './test';
import axios from 'axios';
import { useWeb3React } from "@web3-react/core";
import { Link, useHistory } from 'react-router-dom'
import Rectangle8 from '../assets/image/desktop1/Rectangle8.png'
import { create } from 'domain'
import { ethers } from 'ethers';
import { ttestabi } from "../sol/ttestabi";


const CreatePage: React.FC = () => {
    const [img, setimg] = useState(null || '');
    const [des, setdes] = useState("");
    const [name, setname] = useState("");
    const [res, setres] = useState(null || '');
    const [approveLoading, setApproveLoading] = useState(false);
    const { chainId, library } = useWeb3React();
    const history = useHistory();


    const onClick = async () => {
        setApproveLoading(true);
        const formData = new FormData();
        formData.append('file', img);
        formData.append('name', name);
        formData.append('desc', des);

        console.log(img);
        const res1 = await axios.post("http://52.79.172.23:4321/api/upload", formData);
        setres(res1.data);
        let ipfs = "ipfs://" + res1.data.metaipfs;
        console.log(ipfs);


        const signer = library?.getSigner().connectUnchecked();
        const account2 = await signer.getAddress();

        const nftToken = new ethers.Contract("0x2f2F0638987effD1E5f040AeaD6C8F0C68c2ab5b", ttestabi, signer);
        //  let setApprove = await nftToken.setApprovalForAll("0x6c7579444c36443a4a866F302860176332ffD317", true);
        let tokenid = await nftToken.totalSupply();




        let minttoken = await nftToken.mintWithTokenURI(account2.toString(), tokenid.toString(), ipfs, { gasLimit: 500000 });
        console.log(minttoken);
        setApproveLoading(false);

        history.push("/4");
    }

    const onChangen = (e: any) => {
        //이벤트 발생한 value값으로 {text} 변경
        setname(e.target.value)		//이벤트 발생한 value값으로 {text} 변경
    }
    const onChanged = (e: any) => {
        setdes(e.target.value)		//이벤트 발생한 value값으로 {text} 변경
        //이벤트 발생한 value값으로 {text} 변경
    }

    return (
        <div>
            <div className="testtitle">
                <h1 className="createTitle">Create New Item</h1>
            </div>
            <div className="test2">
                <p >
                    <a className='subFontRed'>*</a> <a className='subFont'>Required fields</a>
                </p>
            </div>

            <div className='middleFontWrapper'>
                <a className='utilMiddleFont'>
                    <label>
                        Image, Video, Audio, or 3D Model<a className='requireItenm'>*</a>
                    </label>
                    <input type="file" id="input-file" style={{ display: "none" }} />
                </a>
            </div>
            <div className='test2'>
                <a className='subFont'>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</a>
            </div>

            {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (

                    <section>

                        <div className='FileWrapper'{...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className='FileWrapper'></div>
                        </div>
                    </section>

                )}                
           </Dropzone> */}

            <MyPage setimg={setimg} />
            <div className='NameWrapper'>
                <a>
                    NAME <a className='requireItenm'>*</a>
                </a>
            </div>

            <div className='NameWrapper'>
                <input className='NameInputBox' type="text" id="name" placeholder='item Name.' value={name} onChange={onChangen}>

                </input>
            </div>

            <div className='DescriptionWrapper'>
                <a>
                    description <a className='requireItenm'>*</a>
                </a>
            </div>


            <div className='DescriptionWrapper'>
                <input className='DescriptionInputBox' type="text" id="description" onChange={onChanged} value={des} placeholder='Provide a detailed description of your item.' >

                </input>
            </div>

            <div className='btnWrapper'>

                <button className="btnStyle"
                    type="button" onClick={onClick}>
                    create
                </button>
            </div>

        </div>

        /* <form>
                <div>
                    <div className="testtitle">
                        <h1 className="createTitle">Create New Item</h1>
                    </div>
                    <div className="test2">
                        <p >
                            <a className='subFontRed'>*</a> <a className='subFont'>Required fields</a>
                        </p>
                    </div>
        
                    <div className='middleFontWrapper'>
                        <a className='utilMiddleFont'>
                            <label>
                                Image, Video, Audio, or 3D Model<a className='requireItenm'>*</a>
                            </label>
                            <input type="file" id="input-file" style={{ display: "none" }} />
                        </a>
                    </div>
                    <div className='test2'>
                        <a className='subFont'>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</a>
                    </div>
        
                    <MyPage setimg={setimg} />
        
                    <div className='NameWrapper'>
                        <a>
                            NAME <a className='requireItenm'>*</a>
        
                        </a>
        
                    </div>
        
        
                    <div className='NameWrapper'>
                        <input className='NameInputBox' type="text" id="name" placeholder='item Name.'></input>
                    </div>
        
                    <div className='DescriptionWrapper'>
                        <a>
                            description <a className='requireItenm'>*</a>
                        </a>
                    </div>
        
        
                    <div className='DescriptionWrapper'>
                        <input className='DescriptionInputBox' type="text" id="description" placeholder='Provide a detailed description of your item.'></input>
                    </div>
        
                    <div className='btnWrapper'>
        
                        <button className="btnStyle"
                            type="button">
                            create
                        </button>
                    </div>
        
                </div>
        </form > */
    )
}
export default CreatePage;