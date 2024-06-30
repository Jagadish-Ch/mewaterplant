import axios, { AxiosError } from 'axios';
import React, {useState, useEffect} from 'react';
import { baseURL } from '../Components/baseURL';
import { useNavigate } from 'react-router-dom';

export const ReturnCanFunctions = (props) => {

  const [user, setUser] = useState([]);
  const [ReturnedCanNo,setReturnedCanNo] = useState("")
  const [newReturnCan, setNewReturnCan] = useState("")
  const [newAmount, setNewAmount] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`${baseURL}/report/${props.id}`)
    .then(response => {
      setUser(response.data)
    }
    )
    .catch(err=>console.log(err))
  },[])

  const canCount = ReturnedCanNo===""?newReturnCan:(ReturnedCanNo).split(',').length
  
  // ================ Updating the ReturnedCans, Amount to DB ===============  
  const updateUser = async(e, id, prevReturnedCans, newReturnedCans, prevAmount, newAmount, prevPaidOrNot) =>{
    const AllReturnedCanNo = 
      ReturnedCanNo!==""?((ReturnedCanNo).split(',')).concat(...user.ReturnedCanNo):(user.ReturnedCanNo)

    const PaidOrNot = newAmount!==0 ?"Amount Paid": prevPaidOrNot
    
    try {
      const updateReturnCansAmount = { 
        ...user,
        ReturnedCanNo : AllReturnedCanNo,
        ReturnedCans : prevReturnedCans+newReturnedCans,
        Amount : prevAmount+newAmount,
        PaidOrNot : PaidOrNot,
      };
      
      await axios.put(`${baseURL}/report/${id}`, updateReturnCansAmount)
      .then(()=>{
        alert("Data Updated Successfully.....!");
        props.handleClose();
        props.setIsUpdated(true);
        setNewReturnCan("");
        setNewAmount("");
        navigate('/returncan/:id')
      })


    } catch (error) {
      if(error.name==='AxiosError' && error.code!=='ERR_BAD_RESPONSE'){
        console.log(error)
        alert("Submitting Failed.....!\nError Occured Check the Console...!")
        props.handleClose();
        setNewReturnCan("");
        setNewAmount("");
      }
      else{
        alert("Data Updated Successfully.....!");
        props.handleClose();
        setNewReturnCan("");
        setNewAmount("");
        props.setIsUpdated(true);
      }
    }
  }
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const handleInput = (e) =>{

    updateUser(
      e,
      user._id,
      user.ReturnedCans,
      Number(canCount),
      user.Amount,
      Number(newAmount),
      user.PaidOrNot,
    )

  }
  
  return(
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
              value={ReturnedCanNo}
              onChange={(e) => setReturnedCanNo(e.target.value)}
            />
            <span className="placeholder">
              క్యాన్ నంబర్*
            </span>
          </div>
        <div className="input-block">
            <input type="number" name="input-text"  required spellCheck="false" autoComplete="off"
              value={canCount}
              onChange={(e) => setNewReturnCan(e.target.value)}
            />
            <span className="placeholder">
              Return Can* / {`${props.notReturnedCans} (Pending)`}
            </span>
          </div>
        <div className="input-block">
            <input type="number" name="input-text" spellCheck="false" autoComplete="off"
              
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