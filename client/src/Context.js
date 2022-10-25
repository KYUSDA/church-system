import React from 'react';
import PageOne from '../src/Components/ContextApi/PageOne'
import {PageProvider} from '../src/Components/ContextApi/PageContext';

const Pageprovider = ()=>{
return(
    <PageProvider>
<PageOne />
    </PageProvider>
)
}
export default Pageprovider;