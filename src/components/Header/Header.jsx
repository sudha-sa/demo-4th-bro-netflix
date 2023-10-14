import React from 'react'
import netflix from "../netflix.png"
import { Link } from 'react-router-dom'
import {GoSearch} from "react-icons/go"

const Header = () => {
    // console.log(netflix)
  return (
    <nav className='header'>

<img src={netflix} alt="netflix" />

<div>
    <Link to="/tvshows">TV Shows</Link>
    <Link to="/movies">Movies</Link>
    <Link to="/new">New</Link>
    <Link to="/recents">Recents</Link>
</div>
<GoSearch/>
    </nav>
  )
}

export default Header