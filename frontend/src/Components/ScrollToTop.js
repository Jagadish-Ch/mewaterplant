import React from 'react';
import '../Styles/ScrollToTop.css';
import upArrow from '../ImagesIcon/UpArrow.png'

const ScrollToTop = () => {
  return (
    <div className='scroll-btn'>
      <button className='scroll-to-top'
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
      >
        <img className='up-arrow' src={upArrow}/>
      </button>
    </div>
  )
}

export default ScrollToTop
