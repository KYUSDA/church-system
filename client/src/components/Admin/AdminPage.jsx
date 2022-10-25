import React from 'react';
import {Link} from 'react-router-dom'
import {useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
// import './table.css'
// import {useNavigate} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './Admin.css';
import './table.css';
const AdminPage = (props)=>{   
const [data,setnewdata] = useState();  
const getMyInfo = async(props)=>{
// console.log('clicked',props);
// const formId = props;
// //get the item values clicked depending on the id passed
// <Navigate to={{
//             pathname: '/formuser',
//             state: { id: formId }
//         }}
// />
    }
    useEffect(()=>{
        const getData = async()=>{
            const dburl = `http://localhost:8080/api/v1/admin/formdatas`;
            const resp = await fetch(dburl);
            const newdata = await resp.json();
            console.log(newdata.myForms);
              setnewdata(newdata);
            //   console.log(data)
        }
       getData();
    },[props.id]);
console.log(data)
if(data){
    console.log(data.myForms);
        return(
            <div className='admin page'>
            <h2>Welcome To Admin Page</h2>
        <div className='membersInfo'
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className='regestered'>
        <h3>Check Out Regestered Members</h3> 
     <Link to='/regestered'>Regesterd Members</Link>
            </div>
            <div className='regestered'>
        <h3>Check Out Approved Members</h3> 
     <Link to='/approved'>Approved Members</Link>
            </div>
            <div className='regestered'>
        <h3>Check Out Disapproved Members</h3> 
     <Link to='/disapproved'>disapproved Members</Link>
            </div>
             </div>
             <div className='filledData'>
                <h2>Already filled in forms</h2>
            <p>Check the various Information alredy filled in per section</p>
                <div className='sections'>
                    <table>
                        <tbody>   
            <tr>
              <th>_id</th>
              <th>formId</th>
              <th>createdby</th>
              <th>createdAt</th>
              <th>View</th>
            </tr>  
            </tbody>        
    {data.myForms.map((item=>(
        <tbody>
    <tr key={item._id}>
    <td>{item._id}</td>
    <td>{item.formId}</td>
    <td>{item.emailUser}</td>
    <td>{item.createdAt}</td>
    <td>{<Link to='/formuser' 
    state={{formId:item.formId}}>Check data</Link>}</td>
    </tr>
    </tbody>
           )))}
           </table>
                </div>
             </div>
             </div>
        )
}else{
    return(
        <div className='admins page'>
                   <h2>Welcome To Admin Page</h2>
        <div className='membersInfo'
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className='regestered'>
        <h3>Check Out Regestered Members</h3> 
     <Link to='/regestered'>Regesterd Members</Link>
            </div>
            <div className='regestered'>
        <h3>Check Out Approved Members</h3> 
     <Link to='/approved'>Approved Members</Link>
            </div>
            <div className='regestered'>
        <h3>Check Out Disapproved Members</h3> 
     <Link to='/disapproved'>disapproved Members</Link>
            </div>
             </div>
             <div className='filledData'>
                <h2>Already filled in forms</h2>
        <div>
</div>
<p>No user form yet</p>
        </div>
        </div>
    )

}

}
export default AdminPage;