import React from 'react'
import './assets/style/Style.css'
import ConnectEth from './components/ConnectEth'
import { Link } from 'react-router-dom'

function Header() {

    return (
        <div className='Rectangle3'  >
            <Link to='/'>
                <text className='BRNDMKT'>
                    BRNDMKT
                </text>
            </Link>
            <Link to='/2'>
                <text className='createPage'>
                    Create
                </text>
            </Link>
            <Link to='/3'>
                <text className='Drops'>
                    Drops
                </text>
            </Link>
            <Link to='/4'>
                <text className='Explore'>
                    Explore
                </text>
            </Link>
            <text className='Staking'>
                Staking
            </text>
            <ConnectEth />
        </div>
    )
}

export default Header