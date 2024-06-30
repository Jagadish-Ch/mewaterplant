import axios,{AxiosError} from 'axios';
import React, {useState, useEffect} from 'react';
import { baseURL } from '../Components/baseURL';
import { useNavigate } from 'react-router-dom';

const ReportAddCanPrompt = (props) => {

const navigate = useNavigate();
const [CanNo, setCanNo] = useState("")
const [newAddCan, setNewAddCan] = useState("")
const [newAmount, setNewAmount] = useState("")
const [user, setUser] = useState([])
useEffect(() => {
    axios.get(`${baseURL}/report/${props.id}`)
    .then(response => 
      setUser(response.data)
    )
  },[])
  
  const canCount = CanNo===""?newAddCan:(CanNo).split(',').length

  const handleInput = (e) =>{
    // ================ Updating the ReturnedCans, Amount to DB ===============  
  const updateUser = async(e, id, prevTotalCans, newTotalCans, prevAmount, newAmount, prevPaidOrNot) =>{
    
    const AllCanNo = 
      CanNo!==""?(((CanNo).split(',')).concat(...user.CanNo)):(user.CanNo)
    const PaidOrNot = (newAmount!==0)?"Amount Paid": prevPaidOrNot
    
    const date=new Date().toLocaleDateString()
    const options = { timeStyle: 'short', hour12: true };
    const time=new Date().toLocaleTimeString('en-US', options)
    const DateTimeStr = `${date} - (${time})`
    try {
      const updateNewAddCansAmount = { 
        ...user,
        CanNo : AllCanNo,
        DateTime : [DateTimeStr,...user.DateTime],
        TotalCans : prevTotalCans+newTotalCans,
        Amount : prevAmount+newAmount,
        PaidOrNot : PaidOrNot,
      };
      
      await axios.put(`${baseURL}/report/${id}`, updateNewAddCansAmount)
      .then(()=>{
        alert("Data Updated Successfully.....!");
        props.setIsUpdated(true);
        props.handleClose();
        navigate('/report/:id')
      })

    } catch (error) {
      if(error.name==='AxiosError' && error.code!=='ERR_BAD_RESPONSE'){
        console.log(error)
        alert("Submitting Failed.....!\nError Occured Check the Console...!")
        props.handleClose();
        setNewAddCan("");
        setNewAmount("");
      }
      else{
        alert("Data Updated Successfully.....!");
        props.handleClose();
        setNewAddCan("");
        setNewAmount("");
        props.setIsUpdated(true);
      }
    }
  }
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    updateUser(
      e,
      user._id,
      user.TotalCans,
      Number(canCount),
      user.Amount,
      Number(newAmount),
      user.PaidOrNot,
    )

  }

  
  return (
    
    <div id="prompt">
        <form>
        <div className="input-block">
            <input type="text" name="input-text"  required spellCheck="false"
              value={user.Name}
              readOnly
            />
            <span className="placeholder">
              
            </span>
          </div>
          <div className="input-block">
            <input type="name" name="input-text"  required spellCheck="false" autoComplete="off"
              value={CanNo}
              onChange={(e) => setCanNo(e.target.value)}
            />
            <span className="placeholder">
            క్యాన్ నంబర్*
            </span>
          </div>
        <div className="input-block">
            <input type="number" name="input-text"  required spellCheck="false" autoComplete="off"
              value={canCount}
              onChange={(e) => setNewAddCan(e.target.value)}
            />
            <span className="placeholder">
              Add Cans*
            </span>
          </div>
        <div className="input-block">
            <input type="number" name="input-text" spellCheck="false" autoComplete="off"
              value={newAmount} 
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <span className="placeholder">
              Amount
            </span>
          </div>
          <div className='flex-btns'>
          <button className='btn save' type="button" onClick={handleInput}>Save</button>
          <button className='btn close' type="button" onClick={props.handleClose} >Close</button>
          </div>
        </form>
    </div>
    
  )
}

export default ReportAddCanPrompt
