import axios from 'axios'
import React from 'react'
import { baseURL } from './baseURL'
import '../Styles/SMTableStyles.css'
import Swal from 'sweetalert2'


const SMTables = (props) => {

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DELETE USER XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async function deleteUser(e, id) {
  
    try{
  
      await axios.delete(`${baseURL}/report/${id}`)
      .then(() =>{
        Swal.fire({
          title:'Customer Deleted Successfully...!',
          icon:'success',
          showConfirmButton:false,
          timer:1000
        })
        props.setIsUpdated(true);
      })
      
    }
    catch(error){
      if(error.name==='AxiosError' && error.code!=='ERR_BAD_RESPONSE'){
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
    }
  }
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
  return (
    <div>
      <div className="lists-container">
        {props.records.map((row, i) => (
          <div key={row._id} className='each-card'>
            <div className='card-title'>
              <h2>{row.Name}</h2>
              <h4>{row.DateTime}</h4>
            </div>
            <dl className='card'>
              {props.headers.map((header, i) => (
                <>
                  <dt>
                    {header}
                  </dt>
                  <dd>: {props.apiHeaders[i]==='RemainingCans' ? row.TotalCans-row.ReturnedCans : row[props.apiHeaders[i]]}</dd>
                </>
              ))}
            </dl>

            <div>
            {props.location==='home' ?<button style={{marginLeft:'2em'}} className='action green-btn' type='button' onClick={() => 
                            props.openPromptForm(
                              row._id,
                              row.WaterType,
                            )}>
                            Add
                  </button>:''}
            <button style={{marginLeft:'1em'}} className="action red-btn" type="button" onClick={(e) => deleteUser(e, row._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SMTables
