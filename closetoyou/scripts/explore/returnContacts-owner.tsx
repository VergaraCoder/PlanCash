import AsyncStorage from "@react-native-async-storage/async-storage"
import { BASEURL } from "../connection";



export const returnContacts = async () => {
    try{
        const access_token:any=await AsyncStorage.getItem("access_token");
        const refresh_token:any=await AsyncStorage.getItem("refresh_token");
   
        const contacts=await fetch(`${BASEURL}/contacts/owner`,{
            method:"GET",
            headers:{
                "access_token":access_token,
                "refresh_token":refresh_token
            }
        });

        const contact= await contacts.json();
        console.log("the contacts is ");
        
        console.log(contact);
        
        if(contact.refresh_token){
            await AsyncStorage.setItem("refresh_token",contact.refresh_token);
            delete contact.refresh_token;
            return contact;
        }
        return contact;

    }catch(err:any){
    }
}