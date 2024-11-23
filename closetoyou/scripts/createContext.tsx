import { createContext, useContext, useState } from "react";


interface Contact {
  name: string;
  email: string;
  telephone: string;
}
interface ContactContextType {
    contacts: Contact[];
    addContact: (name: string, email: string, telephone: string) => void;
  }

const contactContext=createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({children}:any) => {
    const [contacts, setContacts] = useState<any>([]);
    const addContact=(name:any,email:any,telephone:any)=>{
        setContacts([name,email,telephone]);
    }

    return(
        <contactContext.Provider value={{contacts,addContact}}>
             {children}
        </contactContext.Provider>
    );
}


export const useContact=()=> {
    const context=useContext(contactContext);
    return context;
}