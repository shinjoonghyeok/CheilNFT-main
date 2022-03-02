import React from 'react'
import {Link} from 'react-router-dom'
import '../assets/style/Desktop3.css'

import image1 from '../assets/image/desktop1/image1.png'
import mainImg1 from '../assets/image/desktop1/mainImg1.png'
import mainImg2 from '../assets/image/desktop1/mainImg2.png'
import mainImg3 from '../assets/image/desktop1/mainImg3.png'
import mainImg4 from '../assets/image/desktop1/mainImg4.png'

import Rectangle8 from '../assets/image/desktop1/Rectangle8.png'

const Desktop1: React.FC = () => (
    <div>
        <div>
            <img className='D1Rectangle8' src={Rectangle8} />
            <div className='D1G1'>
                <text className='D1FmessageWhite'>
                    Galaxy Fold History NFT　판매 개시!　──────────
                </text>
                <text className='D1FBmessageWhite'>
                    지금 구매하면
                </text>

                <text className='D1FAmessageWhite'>
                    Galaxy Z Flip 4
                </text>

                <text className='D1FBBmessageWhite'>
                    사전판매선정의 혜택!
                </text>

                <Link to='/4' style={{ textDecoration: 'none'}}>
                  <div className='D1Rectangle1'>
                      <text className='D1MmessageWhite'>
                          Explore
                      </text>
                  </div>
                </Link>
                
            </div>
            <img className='D1himage1' src={image1} />

            <div className='D1G2'>
                <text className='D1biggerBrand'>
                    Brand
                </text>
                <text className='D1mintingnow'>
                    Minting Now
                </text>

                <text className='D1underLineBrand'>
                    ───
                </text>
            </div>
            <div>
                <img className='D1mainImg1' src={mainImg1} />
                <text className='D1titleSAMSUNG'>
                    SAMSUNG
                </text>
                <text className='D1txtS'>
                    items　2500　　　Floor　19eth
                </text>
            </div>
            <div>
                <img className='D1mainImg2' src={mainImg2} />
                <text className='D1titleThome'>
                    Thome Browne
                </text>
                <text className='D1txtTh'>
                    items　2500　　　Floor　19eth
                </text>
            </div>
            <div>
                <img className='D1mainImg3' src={mainImg3} />
                <text className='D1titleChevrolet'>
                    Chevrolet
                </text>
                <text className='D1txtCh'>
                    items　2500　　　Floor　19eth
                </text>
            </div>
            <div>
                <img className='D1mainImg4' src={mainImg4} />
                <text className='D1titleAdidas'>
                    Adidas
                </text>
                <text className='D1txtAd'>
                    items　2500　　　Floor　19eth
                </text>
            </div>
        </div>
    </div>
);

export default Desktop1