import React from 'react';
import Page1 from '../Pages/Page1';
import Page2 from '../Pages/Page2';
import Page3 from '../Pages/Page3';
import Page4 from '../Pages/Page4';
import Page5 from '../Pages/Page5';
import Page6 from '../Pages/Page6';
import Home from '../Home/Home'
import {UserProvider} from '../Pages/Context';

export const FormProvider = ()=>{
    return( 
        <UserProvider>
        <div>
            <Page1 />
            <Page2 />
            <Page3 />
            <Page4 />
            <Page5 />
            <Page6 />
        </div>
        </UserProvider>

    )
}

export default FormProvider