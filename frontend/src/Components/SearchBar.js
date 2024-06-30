import React, { useState } from 'react'
import '../Styles/SearchBar.css'
import searchIcon from '../ImagesIcon/searchIcon.png';

const SearchBar = (props) => {
  const handleInput =(e)=>{
    props.setOption(e.target.value)
  }
  return (
    <div className='searchBar'>
      <div className="searchBox">
        <select className='dropdown searchInput' value={props.Option} onChange={handleInput}>
          <option className='dd-body' value='CanNo'>CanNo</option>
          <option className='dd-body' value='Date'>Date</option>
          <option className='dd-body' value='All'>All</option>
        </select>
        <input className="searchInput" type="text" name="" onChange={props.Filter} placeholder="Search"/>
        
        <button className="searchButton" href="#">
            <i className="material-icons">
            <img className='search-icon' src={searchIcon}></img>
            </i>
        </button>
        </div>
        <div className='mbl-searchBox'>
        <select className='select-dd' value={props.Option} onChange={handleInput}>
          <option className='dd-body' value='CanNo'>CanNo</option>
          <option className='dd-body' value='Date'>Date</option>
          <option className='dd-body' value='All'>All</option>
        </select>
        <input className="mbl-sb-input" type="text" name="" onChange={props.Filter} placeholder="Search"/>
        
        <button className="s-icon" href="#">
            <i className="mbl-s-icon">
            <img className='search-icon' src={searchIcon}></img>
            </i>
        </button>
        </div>
    </div>
  )
}

export default SearchBar
