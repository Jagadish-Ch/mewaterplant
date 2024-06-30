import axios from 'axios'
import React,{useState, useEffect} from 'react'
import NavigationButtons from './NavigationButtons'
import { baseURL } from './baseURL';
import Swal from 'sweetalert2';
import SMTables from './SMTables';
import ScrollToTop from './ScrollToTop';
import SearchBar from './SearchBar';
import { Dialog, DialogContent } from '@mui/material';
import ReportAddCanPrompt from '../inputForm/ReportAddCanPrompt';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Styles/MBLCardData.css'


const Report = () => {
  
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [waterType, setWaterType] = useState("")

  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [Option, setOption] = useState("CanNo")
  
  // ================= Getting/Retriving Data from DB =================
  useEffect(() => {
    axios.get(`${baseURL}/report`)
    .then(response => {
      setUsers(response.data);
      setRecords((response.data).reverse());
    })
    .catch(err => { 
      console.log(err)});
    setIsUpdated(false);
  }, [isUpdated===true]);
  // ==================================================================

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
      
        await axios.post('https://sheet.best/api/sheets/7b4327a8-9bac-4954-96b7-bd0ed62cbac9', userDeleteData)
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

  
  const Filter = (event) =>{
    
    const input = event.target.value
    if(input===""){
      window.location.reload();
    }
    if(Option==="CanNo"){
    
  /*  const searchUserCanNo = users.map((user) => {
      
      if(input===""){
        
      }else{
        const matchedIndex = user.CanNo.includes(input)

        if((matchedIndex !==false)){
          return matchedIndex
        }
        else{
          return "0"
        }
      }
    })
    console.log(searchUserCanNo)
    const user_n = [searchUserCanNo.findIndex(ele=>ele!==false)] //------
    console.log(user_n)
    console.log(user_n)
    const i = user_n === -1 ? 0 : user_n
    console.log(i)
    const matched_i = searchUserCanNo[user_n]===undefined?0:searchUserCanNo[user_n]
    console.log(matched_i)
    console.log(users[0]["CanNo"][0])
  */
    setRecords(users.filter(f => f.CanNo.includes(event.target.value)));
  }
  else if(Option==="Date"){
    setRecords(users.filter(f => f.DateTime[0].includes(event.target.value)))
  }
  else{
    setRecords(users.filter(f => f.Name.toLowerCase().includes(event.target.value)||f.WaterType.toLowerCase().includes(event.target.value)||f.MobileNo.includes(event.target.value)));
  }
  }

  const [openForm, setOpenForm] = useState(false)

  const openPromptForm = (id, customerWaterType) =>{
    setOpenForm(true);
    setId(id);
    setWaterType(customerWaterType);
  }

  const handleClose =()=>{
    setOpenForm(false)
    navigate('/report/:id')
  }

  const headers = ['Mobile Number', 'Address', 'Water Type','క్యాన్ నంబర్',
                    'ఇచ్చిన క్యాన్లు', 'తిరిగి ఇచ్చిన క్యాన్లు', 'Pending క్యాన్లు', 'ఇచ్చిన Amount',
                    'Paid / NotPaid'];
  const apiHeaders = ['MobileNo', 'Address', 'WaterType','CanNo',
                    'TotalCans', 'ReturnedCans', 'RemainingCans', 'Amount',
                    'PaidOrNot'];

  let totalGivenCans = 0;
  let totalReturnedCans = 0;
  let totalPendingCans = 0;
  let totalAmount = 0;
  for (let key in users) {
    totalGivenCans += users[key].TotalCans;
    totalReturnedCans += users[key].ReturnedCans;
    totalPendingCans += (users[key].TotalCans-users[key].ReturnedCans);
    totalAmount += users[key].Amount;
  }

  return (
    <div>
      <center>
        <NavigationButtons/>
        <br/>
        <h1 className='report-pg-title'>Water Plant Report</h1><br></br>
        <SearchBar Filter={Filter} Option={Option} setOption={setOption} />
        <br/>
        <div id="prompt-form">
        <Dialog open={openForm} onClose={handleClose}>
          <div className='order-prompt-title'>
            <h2 style={{textAlign:'center'}}>Add {` ${waterType} `} Can</h2>
          </div>
          <DialogContent >
            <ReportAddCanPrompt 
              id={id}
              handleClose={handleClose}
              setIsUpdated={setIsUpdated}
            />
        </DialogContent>
        </Dialog>
        </div>
        <div className='report-table-data'>
        <table className='report-table table'>
          <thead>
            
            <tr>
              <th className='date-time'>Date-Time</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Water Type</th>
              <th>ఇచ్చిన క్యాన్ నంబర్</th>
              <th>ఇచ్చిన క్యాన్లు</th>
              <th>తిరిగి ఇచ్చిన క్యాన్ నంబర్</th>
              <th>తిరిగి ఇచ్చిన క్యాన్లు</th>
              <th>Pending క్యాన్ నంబర్</th>
              <th>Pending క్యాన్లు</th>
              <th>ఇచ్చిన Amount</th>
              <th>Paid / NotPaid</th>
              <th>క్యాన్లు Add,Delete చేయి</th>
            </tr>
            
          </thead>

          <tbody>

          {records.map((user,i) => {
            const RemainingCans = user.TotalCans-user.ReturnedCans;
            const PendingCanNo =
                  (user.CanNo).filter((element) => !(user.ReturnedCanNo).includes(element));
            return(
              
              
            <tr key={i}>
              
              <td className='tbl-header date-time.'>{user.DateTime}</td>
              <td className='tbl-data' aria-label='Name'>{user.Name}</td>
              <td className='tbl-data' aria-label='Mobile No.'>{user.MobileNo}</td>
              <td className='tbl-data' aria-label='Address'>{user.Address}</td>
              <td className='tbl-data' aria-label='Water Type'>{user.WaterType +" "} Water</td>
              <td className='tbl-data' aria-label='ఇచ్చిన క్యాన్ నంబర్' style={{backgroundColor:"rgb(157, 246, 168)"}}>{user.CanNo.join(", ")}</td>
              <td className='tbl-data' aria-label='ఇచ్చిన క్యాన్లు' style={{backgroundColor:"rgb(157, 246, 168)"}}>{user.TotalCans}</td>
              <td className='tbl-data' aria-label='తిరిగి ఇచ్చిన క్యాన్ నంబర్' style={{backgroundColor:"rgb(243, 248, 173)"}}>{user.ReturnedCanNo.join(", ")}</td>
              <td className='tbl-data' aria-label='తిరిగి ఇచ్చిన క్యాన్లు' style={{backgroundColor:"rgb(243, 248, 173)"}}>{user.ReturnedCans}</td>
              <td className='tbl-data' aria-label='Pending క్యాన్ నంబర్' style={{backgroundColor:"rgb(248, 173, 173)"}}>{PendingCanNo.join(", ")}</td>
              <td className='tbl-data' aria-label='Pending క్యాన్లు' style={{backgroundColor:"rgb(248, 173, 173)"}}>{RemainingCans}</td>
              <td className='tbl-data' aria-label='ఇచ్చిన Amount'>{user.Amount}</td>
              <td className='tbl-data' aria-label='Paid / NotPaid'>{user.PaidOrNot}</td>
              <td className='action-btn'><Link to={`/report/${user._id}`}><button className='action green-btn tbl-save-btn' type='button' onClick={() => 
                            openPromptForm(
                              user._id,
                              user.WaterType,
                            )}>
                            Add
                  </button></Link><br/><br/>
                  <Link to={`/report/${user._id}`}><button className="action red-btn tbl-delete-btn" type="button"
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
                    RemainingCans,
                    user.Amount,
                    user.PaidOrNot

                  )}>Delete</button></Link>
              </td> 
            </tr>
            
          )})}
          </tbody>
        </table>
      </div>
      </center>
      <ScrollToTop/>
      {/*<SMTables location='home' 
      openPromptForm={openPromptForm} 
      headers={headers} 
      apiHeaders={apiHeaders} 
      records={records}
      setIsUpdated={setIsUpdated}/>*/}
    </div>
      
  )
}

export default Report