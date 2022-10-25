import { useState } from 'react';
import {useEffect} from 'react';
import React, { createContext } from "react";
//import both
export const UserContext = createContext();
export const UserProvider = (props) => {
    // const [name, setName] = useState("John Doe");
    // const [age, setAge] = useState(1);
    // const happyBirthday = () => setAge(age + 1);
    return (
      <UserContext.Provider
       value={"hello"}>
        {props.children}
      </UserContext.Provider>
    );
  };
