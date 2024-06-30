import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from './baseURL';
import '../Styles/FinalReport.css';

const FinalReport = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/report`)
        .then(response => {
          setUsers(response.data);
        }
        )
        .catch(err => 
          console.log(err));
    }, []);
  
    let totalGivenCans = 0;
    let totalReturnedCans = 0;
    let totalPendingCans = 0;
    let totalAmount = 0;
    for (let key in users) {
      if(users[key].WaterType==='Cooling'){
        totalGivenCans += users[key].TotalCans;
        totalReturnedCans += users[key].ReturnedCans;
        totalPendingCans += (users[key].TotalCans-users[key].ReturnedCans);
        totalAmount += users[key].Amount;
      }
    }
  return (
    <marquee behavior='scroll'
        scrollamount='6'
        width='100%'
        direction='left'
        height='auto'
        className='scroll-cans'
        >
         మొత్తం ఇచ్చిన కూలింగ్ క్యాన్లు  : {totalGivenCans} |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| మొత్తం తిరిగి ఇచ్చిన కూలింగ్ క్యాన్లు : {totalReturnedCans} |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| మొత్తం Pending క్యాన్లు : {totalPendingCans} |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| మొత్తం ఇచ్చిన Amount : {totalAmount} |
    </marquee> 
  )
}

export default FinalReport
