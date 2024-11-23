import { Alert } from "react-native";
import { saveData } from "../explore/saveData";
import { useState } from "react";
import { useContact } from "../createContext";


 export const reviewValues=async(email:string,name:string,telephone:string,setError:any,setButton:any, valueImage:string)=>{
    try{

        if(!name || !email || !telephone){
            throw new Error("The inputs cannot undefined");
        }
        if(!valueImage){
            throw new Error("The constact must had a photo");
        }
        const data=JSON.stringify({name:name,email:email,telephone, photoUri:valueImage});
        await saveData(data);
        
        setButton(true);

        alert("contact saved correctly");        
    }catch(err:any){
        console.log("err is ", err);
        setError(err.message)
        setTimeout(()=>{
            setError("");
        },2000)
    }
}