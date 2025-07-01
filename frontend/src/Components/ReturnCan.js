import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Dialog, DialogContent} from "@mui/material";
import NavigationButtons from './NavigationButtons';

import { ReturnCanFunctions} from '../inputForm/ReturnCanFunctions';
import '../Styles/ReturnCan.css';
import { baseURL } from './baseURL';
import Swal from 'sweetalert2';
import ScrollToTop from './ScrollToTop';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const  ReturnCan = () => {

  const navigate = useNavigate()
  const [_id, set_Id] = useState('')
  //
  const [notReturnedCans,setNotReturnedCans] = useState(0)
  const [waterType, setWaterType] = useState("")
  const [Option, setOption] = useState("CanNo")

  // ===================== Getting/Retrive the Data from API =================
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  
  useEffect(() => {
      axios.get(`${baseURL}/report`)
      .then(response => {
        setUsers(response.data);
        setRecords((response.data).reverse());
      })
      .catch(err => console.log(err));
      setIsUpdated(false);
  }, [isUpdated===true])

  const Filter = (event) =>{
    
    const input = event.target.value
    if(input===""){
      window.location.reload();
    }
    if(Option==="CanNo"){
      setRecords(users.filter(f => f.CanNo.includes(event.target.value)));
    }
    else if(Option==="Date"){
      setRecords(users.filter(f => f.DateTime[0].includes(event.target.value)))
    }
    else{
      setRecords(users.filter(f => f.Name.toLowerCase().includes(event.target.value)||f.WaterType.toLowerCase().includes(event.target.value)||f.MobileNo.includes(event.target.value)));
    }
  }

  // ========================================================================

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DELETE USER XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async function deleteUser(e, id, DateTime, Name, MobileNo, Address, WaterType, CanNo, TotalCans, ReturnedCanNo, ReturnedCans, PendingCanNo, RemainingCans, Amount, PaidOrNot) {
  
    let Confirmation = "Do you want to Delete...!";
    if (window.confirm(Confirmation) == true) {
      const date=new Date().toLocaleDateString()
      const options = { timeStyle: 'short', hour12: true };
      const time=new Date().toLocaleTimeString('en-US', options)
      const DeletedDateTimeStr = `${date} - (${time})`

      const userDeleteData={
        "డిలీట్ చేసిన Date-Time":DeletedDateTimeStr,
        DateTime,
        Name, 
        MobileNo, 
        Address, 
        WaterType, 
        "ఇచ్చిన క్యాన్ నంబర్": CanNo, 
        "ఇచ్చిన క్యాన్లు": TotalCans,
        "తిరిగి ఇచ్చిన క్యాన్ నంబర్": ReturnedCanNo,
        "తిరిగి ఇచ్చిన క్యాన్లు": ReturnedCans, 
        "Pending క్యాన్ నంబర్": PendingCanNo, 
        "Pending క్యాన్లు": RemainingCans, 
        "ఇచ్చిన Amount": Amount, 
        "Paid / NotPaid": PaidOrNot
      }
      
      try{
      
        // await axios.post('https://sheet.best/api/sheets/7b4327a8-9bac-4954-96b7-bd0ed62cbac9', userDeleteData)
        await axios.delete(`${baseURL}/report/${id}`)
        .then(() =>{
          Swal.fire({
            title:'Customer Deleted Successfully...!',
            icon:'success',
            showConfirmButton:false,
            timer:1000
          })
          setIsUpdated(true);
        })
        .catch(err=> console.log(err))

      }
      catch(error){
        e.preventDefault();
        console.log(error);
        Swal.fire({
          title:'Deleted Failed...!',
          text:'Check the Console for Error',
          icon:'error',
          showConfirmButton:false,
          timer:1000
        })
      }
    }else {
      Swal.fire({
        title:'Cancelled',
        text:'You Cancelled the Deletion!',
        icon:'error',
        showConfirmButton:false,
        timer:1500
      })
    }
  }
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
  const [openForm, setOpenForm] = useState(false)

  const openPromptForm = (_id, customerWaterType, notReturnedCans) =>{
    setOpenForm(true);
    set_Id(_id);
    setNotReturnedCans(notReturnedCans);
    setWaterType(customerWaterType);
  }

  const handleClose =()=>{
    setOpenForm(false)
    navigate('/returncan/:id')
  }


  const headers= ['Mobile Number', 'Water Type', 'Pending క్యాన్లు', 'Paid / Not Paid']
  const apiHeaders= ['MobileNo', 'WaterType', 'RemainingCans', 'PaidOrNot']

  return (
    <div className='return-pg'>
      <div>
      <center>
        <NavigationButtons/>
        <br/>
        <h2 className='title'> క్యాన్లు తిరిగి ఇవ్వని వారు</h2><br></br>
        <SearchBar Filter={Filter} Option={Option} setOption={setOption} />
        <br/>
        <div id="prompt-form">
        <Dialog open={openForm} onClose={handleClose}>
          <div className='order-prompt-title'>
            <h2 style={{textAlign:'center'}}>Return {` ${waterType} `} Can</h2>
          </div>
          <DialogContent >
            <ReturnCanFunctions 
              id={_id}
              notReturnedCans={notReturnedCans}
              handleClose={handleClose}
              setIsUpdated={setIsUpdated}
            />
        </DialogContent>
        </Dialog>
        </div>

        {/*<div className='return-table'>*/}
          <br/>
          <div className='report-table-data'>
            <table className='report-table table'>
              <thead>
                
                <tr>
                  <th className='date-time'>Date - Time</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Water Type</th>
                  <th>Pending క్యాన్ నంబర్</th>
                  <th>Pending క్యాన్లు</th>
                  <th>Paid / Not Paid</th>
                  <th></th>
                </tr> 
                
              </thead>
              <tbody>
              {records.map((user) => {
                const PendingCanNo =
                (user.CanNo).filter((element) => !(user.ReturnedCanNo).includes(element));
                //
                const NotReturnedCans = user.TotalCans-user.ReturnedCans;
                    //
                    return (
                      
                        <tr key={user._id} className='e-space'>
                          <td className='tbl-header e-space'>{`${user.DateTime[0].slice(0,10)}`}<br/>{user.DateTime[0].slice(12,25)}</td>
                          <td className='tbl-data e-space' aria-label="Name">{user.Name}</td>
                          <td className='tbl-data e-space' aria-label="Mobile No.">{user.MobileNo}</td>
                          <td className='tbl-data e-space' aria-label="Water Type">{user.WaterType}</td>
                          <td className='tbl-data e-space' aria-label="Pending క్యాన్ నంబర్" style={{backgroundColor:"rgb(248, 173, 173)"}}>{PendingCanNo.join(", ")}</td>
                          <td className='tbl-data e-space' aria-label="Pending క్యాన్లు" style={{backgroundColor:"rgb(248, 173, 173)"}}>{NotReturnedCans}</td>
                          <td className='tbl-data e-space' aria-label="Paid / Not Paid">{user.PaidOrNot}</td>
                          <td className='action-btn' ><Link to={`/returncan/${user._id}`}><button className='action green-btn tbl-save-btn' type='button' onClick={() => 
                            openPromptForm(
                              user._id,
                              user.WaterType,
                              NotReturnedCans,
                            )}>
                            Return
                          </button></Link><br/><br/>
                          <button className='action red-btn tbl-delete-btn' type="submit"
                           onClick={(e) => deleteUser(
                            e, user._id, 
                            user.DateTime,
                            user.Name,
                            user.MobileNo,
                            user.Address,
                            user.WaterType+" Water",
                            user.CanNo.join(", "),
                            user.TotalCans,
                            user.ReturnedCanNo.join(", "),
                            user.ReturnedCans,
                            PendingCanNo.join(", "),
                            NotReturnedCans,
                            user.Amount,
                            user.PaidOrNot
                          )}>Delete</button></td>
                          
                        </tr>
                      
                    );
                /*if(user.WaterType==="Cooling"){
                  if(user.PaidOrNot==="Amount Not Paid" || user.TotalCans!=user.ReturnedCans){
                    const NotReturnedCans = user.TotalCans-user.ReturnedCans;
                    //
                    return (
                      
                        <tr key={user._id}>
                          <td className='tbl-header'>{`${user.DateTime[0].slice(0,10)}`}<br/>{user.DateTime[0].slice(12,25)}</td>
                          <td className='tbl-data' aria-label="Name">{user.Name}</td>
                          <td className='tbl-data' aria-label="Mobile No.">{user.MobileNo}</td>
                          <td className='tbl-data' aria-label="Water Type">{user.WaterType}</td>
                          <td className='tbl-data' aria-label="Pending క్యాన్ నంబర్" style={{backgroundColor:"rgb(248, 173, 173)"}}>{PendingCanNo.join(", ")}</td>
                          <td className='tbl-data' aria-label="Pending క్యాన్లు" style={{backgroundColor:"rgb(248, 173, 173)"}}>{NotReturnedCans}</td>
                          <td className='tbl-data' aria-label="Paid / Not Paid">{user.PaidOrNot}</td>
                          <td className='action-btn' ><Link to={`/returncan/${user._id}`}><button className='action green-btn tbl-save-btn' type='button' onClick={() => 
                            openPromptForm(
                              user._id,
                              user.WaterType,
                              NotReturnedCans,
                            )}>
                            Return
                          </button></Link><br/><br/>
                          <button className='action red-btn tbl-delete-btn' type="submit" onClick={(e) => deleteUser(e,user._id)}>Delete</button></td>
                          
                        </tr>
                      
                    );
                  }
                }*/
              })}
              </tbody>
            </table>
          </div>
        {/*</div>*/}
      </center>
      </div>
      <ScrollToTop/>
      {/*<div className="lists-container">
                
        {records.map((row, i) => {
          if(row.WaterType==="Cooling"){
            if(row.PaidOrNot==="Amount Not Paid" || row.TotalCans!=row.ReturnedCans){
              return(
              <div  className='each-card'>
                <div className='card-title'>
                  <h2>{row.Name}</h2>
                  <h4>{row.DateTime}</h4>
                </div>
                <dl className='card'>
                  {headers.map((header, i) => (
                    <>
                      <dt>
                        {header}
                      </dt>
                      <dd>: {apiHeaders[i]==='RemainingCans' ? row.TotalCans-row.ReturnedCans : row[apiHeaders[i]]}</dd>
                    </>
                  ))}
                </dl>
                <div className='flex-btn'>
                <button className='btn-size action green-btn' type='button' onClick={() => 
                            openPromptForm(
                              row._id,
                              row.WaterType,
                              row.TotalCans-row.ReturnedCans
                            )}>
                            Edit
                          </button>
                <button className="btn-size action red-btn" type="button" onClick={(e) => deleteUser(e, row._id)}>Delete</button>
                </div>
            </div>
              )
            }
          }
        })}
      </div>*/}
      
    </div>
  )
}

export default ReturnCan
