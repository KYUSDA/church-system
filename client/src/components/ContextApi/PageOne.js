import React,{useContext} from 'react';
import {PageoneContext} from './PageContext';
function PageOne() {
  const value = useContext(PageoneContext);
  console.log(value);
  return (
     <div>
    <p>{value}</p>
    </div>
  )
}

export default PageOne