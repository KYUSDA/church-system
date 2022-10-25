import React ,{createContext} from 'react';
//create context
export const PageoneContext = createContext();
export const PageProvider = (props)=>{
    const pageId = Math.floor(Date.now() /1000);
    console.log(pageId);
return(
        <PageoneContext.Provider value={pageId}>
{props.children}
        </PageoneContext.Provider>
    )
}
