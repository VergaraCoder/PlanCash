import React, { createContext, useContext, useState } from 'react';


interface context{
    name:string;
    email:string;
    telephone:string
}


const ContactContext = createContext<any>([]);


export const ContactProvider = ({ children }:any) => {
    const [contact, setContacts] = useState<any>([]);

    return (
        <ContactContext.Provider value={{ contact, setContacts }}>
            {children}
        </ContactContext.Provider>
    );
};


export const useContacts = () => {
    return useContext(ContactContext);
};
