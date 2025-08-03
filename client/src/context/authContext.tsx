

import {createContext,Dispatch,SetStateAction,useContext,useState} from "react";

interface IContext {
  activationToken: string | null;
  setActivationToken: Dispatch<SetStateAction<string | null>>;
}


export const AppContext = createContext<IContext | undefined>(undefined);

export default function ProviderFunction({children}: {children: React.ReactNode}) {
  const [activationToken, setActivationToken] = useState<string | null>(null);


  return (
    <AppContext.Provider value={{activationToken,setActivationToken}}>
          {children}
    </AppContext.Provider>
  );
}

export const useContextFunc = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Context not found");
  return context;
};