// import React, { useState } from 'react'
// import '../Styles/MBLCardData.css'


// const MBLCardData = (props) => {
//   return (
//       <table className='table'>
//         {/*<thead>
//             <th className='date-time'>Date-Time</th>
//             <th>Name</th>
//             <th>Mobile Number</th>
//             <th>Address</th>
//             <th>Water Type</th>
//             <th>ఇచ్చిన క్యాన్ నంబర్</th>
//             <th>ఇచ్చిన క్యాన్లు</th>
//             <th>తిరిగి ఇచ్చిన క్యాన్ నంబర్</th>
//             <th>తిరిగి ఇచ్చిన క్యాన్లు</th>
//             <th>Pending క్యాన్ నంబర్</th>
//             <th>Pending క్యాన్లు</th>
//             <th>ఇచ్చిన Amount</th>
//             <th>Paid / NotPaid</th>
//             <th>క్యాన్లు Add,Delete చేయి</th>    
//         </thead>*/}
//         <tbody>
//             <tr>
//                 <td className='tbl-header'>
//                     16/06/2024 - (9:14 PM)
//                     16/06/2024 - ( 9:12 PM )
//                     16/06/2024 - (9:09 PM)
//                 </td>
//                 <td className='tbl-data' aria-label='Name'><b>Kasi</b></td>
//                 <td className='tbl-data' aria-label='Mobile No.'>9300121257</td>	
//                 <td className='tbl-data' aria-label='Address'>Paritala</td>	
//                 <td className='tbl-data' aria-label='Water Type'>Cooling Water</td>
//                 <td className='tbl-data' style={{color:'green'}} aria-label='ఇచ్చిన క్యాన్ No.'><b>29, 36, 13, 25</b></td>	
//                 <td className='tbl-data' style={{color:'green'}} aria-label='ఇచ్చిన క్యాన్లు'><b>5</b></td>	
//                 <td className='tbl-data' style={{color:'blue'}} aria-label='తిరిగి ఇచ్చిన క్యాన్ No.'><b>29</b></td>
//                 <td className='tbl-data' style={{color:'blue'}} aria-label='తిరిగి ఇచ్చిన క్యాన్లు'><b>2</b></td>	
//                 <td className='tbl-data' style={{color:'red'}} aria-label='Pending క్యాన్ No.'><b>29, 13, 25</b></td>	
//                 <td className='tbl-data' style={{color:'red'}} aria-label='Pending క్యాన్లు'><b>3</b></td>	
//                 <td className='tbl-data' aria-label='ఇచ్చిన Amount'>120</td>	
                
//                 <td className='tbl-data' aria-label='Paid / NotPaid'><span style={{backgroundColor:'rgb(158, 232, 48)',padding:'10px', borderRadius:'10px'}}><b>Amount Paid</b></span></td>
//                 <td className='action-btn'>
//                 {props.location==='home' ?<button className='tbl-save-btn' onClick={() => 
//                             props.openPromptForm(
//                               row._id,
//                               row.WaterType,
//                             )}>
//                             Add
//                   </button>:''}
//                   <button className='tbl-save-btn' onClick={() => 
//                             props.openPromptForm(
//                               row._id,
//                               row.WaterType,
//                             )}>
//                             Add
//                   </button>
//                   <button className='tbl-delete-btn' onClick={(e) => deleteUser(e, row._id)}>Delete</button>
//                 </td>
//             </tr>
//             <tr>
//                 <td className='tbl-header'>
//                     16/06/2024 - (9:14 PM)
//                     16/06/2024 - ( 9:12 PM )
//                     16/06/2024 - (9:09 PM)
//                 </td>
//                 <td className='tbl-data' aria-label='Name'><b>Kasi</b></td>
//                 <td className='tbl-data' aria-label='Mobile No.'>9300121257</td>	
//                 <td className='tbl-data' aria-label='Address'>Paritala</td>	
//                 <td className='tbl-data' aria-label='Water Type'>Cooling Water</td>
//                 <td className='tbl-data' aria-label='ఇచ్చిన క్యాన్ No.'>29, 36, 13, 25</td>	
//                 <td className='tbl-data' aria-label='ఇచ్చిన క్యాన్లు'>5</td>	
//                 <td className='tbl-data' aria-label='తిరిగి ఇచ్చిన క్యాన్ No.'>29</td>
//                 <td className='tbl-data' aria-label='తిరిగి ఇచ్చిన క్యాన్లు'>2</td>	
//                 <td className='tbl-data' aria-label='Pending క్యాన్ No.'>29, 13, 25</td>	
//                 <td className='tbl-data' aria-label='Pending క్యాన్లు'>3</td>
//                 <td className='tbl-data' aria-label='ఇచ్చిన Amount'>120</td>	
//                 <td className='tbl-data' aria-label='Paid / NotPaid'>Amount Not Paid</td>
//                 <td className='action-btn'>
//                   {props.location==='home'?
//                   <button className='tbl-save-btn'>Add</button>:""
//                   }
//                   <button className='tbl-delete-btn'>Delete</button>
//                 </td>
//             </tr>
//         </tbody>
//       </table>
//   )
// }

// export default MBLCardData
