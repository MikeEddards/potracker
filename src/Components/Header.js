import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/code_logo_300w.png'

export default function Header(props) {
    return (
        <div>
            <header>
                <Link to={{pathname: '/'}}>
                    <img src={logo} alt='code logo'/>
                </Link>
            </header>
        </div>
    )
}
