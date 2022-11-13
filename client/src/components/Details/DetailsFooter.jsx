import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

function DetailsFooter() {
  return (
    <MDBFooter className='text-center text-white'
    style={{ backgroundColor: '#21081a' }}>
 <MDBContainer className='p-4'></MDBContainer>
 <div className='text-center p-3' style={{ backgroundColor: 'green', 
 textAlign:'center' ,padding:'15px'}}>
        © 2022 Copyright:
        <a className='text-white' href='/'>
         KYUSDA
        </a>
      </div>
    </MDBFooter>
  )
}

export default DetailsFooter