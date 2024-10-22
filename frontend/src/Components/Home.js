import React from 'react';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className='home-title'>
          <marquee behavior='scroll'
          scrollamount='8'
          width='100%'
          direction='left'
          height='100%'
          ><h1 className='home-text-shadow'><span>&#9827;</span>  Water Plant - (Plant Name) <span>&#9827;</span> </h1></marquee>
      </div>
      
      <div>
        <div className='empty-space'>
        <div className='btns center-box'>
          <button className='default btn-15' onClick={()=>navigate("/order")}>Order</button>
          <button className='default btn-15' onClick={()=>navigate("/returncan/:id")}>Return Can</button>
          <button className='default btn-15' onClick={()=>navigate("/report/:id")}>Report</button>
          <button className='default btn-15' onClick={()=>navigate("/pending")}>Pending</button>
          <button className='default btn-15'><a className='deleted-history' href='https://docs.google.com/spreadsheets/d/11RVlATUi8cN8EmpBfqV7VS_S8-ISwjlOaGi4kobuA3k/edit?gid=0#gid=0' target='_blank'>Del-Hist</a></button>
        </div>
        <p>{window.innerWidth} X {window.innerHeight}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
