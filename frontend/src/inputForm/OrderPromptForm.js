import axios from 'axios';
import React, {useState} from 'react'
import '../Styles/Styles.css'
import '../Styles/OrderPromptForm.css'
import {Dialog, DialogContent} from "@mui/material"
import { baseURL } from '../Components/baseURL';
import { useNavigate } from 'react-router-dom';
//import {v4 as uuid} from 'uuid'




const OrderPromptForm = () => {

  // ========================= Varibles using in the Form ==============
  
  const navigate = useNavigate()
  const [CanNo,setCanNo] = useState('')
  const [Name,setName] = useState('')
  const [eachCanAmount,setEachCanAmount] = useState('')
  const [mblNo,setmblNo] = useState('')
  const [TotalCans,setTotalCans] = useState('')
  const [Address,setAddress] = useState('')
  const [Amount,setAmount] = useState('')
  // ====================================================================

  // ====================== Sending FormData to API ======================
  const createUser = async (event) => {
    
    const date=new Date().toLocaleDateString()
    const options = { timeStyle: 'short', hour12: true };
    const time=new Date().toLocaleTimeString('en-US', options)
    const DateTimeStr = `${date} - (${time})`

    var PaidOrNot=""
    if(Amount===""){
      PaidOrNot = "Amount Not Paid"
    }
    else{
      PaidOrNot= "Amount Paid"
    }
    
    if(Name==="" || mblNo==="" || TotalCans===""){
      alert("Please Fill atleast \nName, \nMobile Number,\nTotal Cans")
    }
    else{
        const userData={
          //id : uuid().slice(0,8),
          CanNo : CanNo.split(','),
          ReturnedCanNo : ["-"],
          DateTime : DateTimeStr,
          WaterType : WaterType,
          Name : Name,
          MobileNo : mblNo,
          TotalCans : Number(TotalCans),
          ReturnedCans : 0,
          Address : Address===""?"Paritala":Address,
          EachCanAmount : Number(eachCanAmount===""?"35":eachCanAmount),
          Amount : Number(Amount),
          PaidOrNot : PaidOrNot,
        }

        
        try {
          await axios.post(`${baseURL}/report`, userData).then(
            alert("Data Submitted Successfully...!")
          );
          navigate('/order')
          setName("")
          setmblNo("")
          setTotalCans("")
          setAddress("")
          setEachCanAmount("")
          setAmount("")
          
        } 
        catch (error) {
          if(error.name==='AxiosError' && error.code!=='ERR_BAD_RESPONSE'){
            console.log(error)
            alert("Submitting Failed...!\nCheck the Console for Error...")
          }
        }
      };
    }
    // =====================================================================

  const [WaterType, setWaterType] = useState("")
  const [openForm, setOpenForm] = useState(false)
  
  const openPromptForm = (value) =>{
    setWaterType(value)
    setOpenForm(true)
  }

  const handleClose =()=>{
    setOpenForm(false)
    setCanNo("")
    setName("")
    setmblNo("")
    setTotalCans("")
    setAddress("")
    setEachCanAmount("")
    setAmount("")
    navigate('/order')
  }

  return (
    <div>
    <center>
      <div className='empty-space order'>
      <div className='center-box order-pg1'>
          <div className='water-type-btn'>
          <h1 className='order-title'>Order</h1>
            <button className="custom-btn btn-2" value="Cooling"onClick={()=>openPromptForm("Cooling")}>Cooling</button>
            <button className="custom-btn btn-2" value="Normal" onClick={()=>openPromptForm("Normal")}>Normal</button>
          </div>
      </div>
      </div>
      

      <div className='prompt-border'>
        <Dialog open={openForm} onClose={handleClose}>
        <div id='order-form'>
        <div className='prompt-title'>
          <h1 >{WaterType} Water</h1>
        </div>
        <DialogContent>
        <form onSubmit={createUser} id="order-input-form" className='prompt'>

          <div className="input-block">
            <input type="text" name="input-text"  required spellCheck="false" autoComplete="off"
              value={CanNo}
              onChange={(e)=>setCanNo(e.target.value)}
            />
            <span className="placeholder">
              CanNo*
            </span>
          </div>
          <div className="input-block">
            <input type="text" name="input-text"  required spellCheck="false" autoComplete="off"
              value={Name}
              onChange={(e)=>setName(e.target.value)}
            />
            <span className="placeholder">
              Name*
            </span>
          </div>
          <div className="input-block">
            <input type="text" name="input-text" required spellCheck="false" autoComplete="off"
              value={mblNo}
              onChange={(e)=>setmblNo(e.target.value)}
            />
            <span className="placeholder">
            Mobile-No*
            </span>
          </div>
          <div className="input-block">
            <input type="text" name="input-text"  required spellCheck="false" autoComplete="off"
              value={TotalCans}
              onChange={(e)=>setTotalCans(e.target.value)}
            />
            <span className="placeholder">
              Total Cans*
            </span>
          </div>
          <div className="input-block">
            <input type="text" name="input-text" spellCheck="false" autoComplete="off"
              value={eachCanAmount}
              onChange={(e)=>setEachCanAmount(e.target.value)}
            />
            <span className="placeholder">
              ఒక్క క్యాన్ Amount ఎంత
            </span>
          </div>
          <div className="input-block">
            <input type="text" name="input-text" spellCheck="false" autoComplete="off"
              value={Amount}
              onChange={(e)=>setAmount(e.target.value)}
            />
            <span className="placeholder amount">
              ఇచ్చిన Amount
            </span>
          </div>
          <div className="input-block">
            <input type="text" name="input-text"  spellCheck="false" autoComplete="off"
              value={Address}
              onChange={(e)=>setAddress(e.target.value)}
            />
            <span className="placeholder address">
              Address
            </span>
          </div><br></br>
          <div className='form-btns'>
          <input className="btn save" type="submit" value="Submit"/>
          <input type="button" className="btn close" value='Close' onClick={handleClose}/>
          </div>
        </form>
        
        </DialogContent>
        </div>
        </Dialog>
      </div>
    </center>
    </div>
  )
}

export default OrderPromptForm