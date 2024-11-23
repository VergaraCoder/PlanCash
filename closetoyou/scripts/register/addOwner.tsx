import AsyncStorage from "@react-native-async-storage/async-storage"
import { BASEURL } from "../connection";

interface dataOwner{
    name:string;
    email:string;
    password:string;
    photoOwner:string;
}



export const addData = async (data:dataOwner,setError:any) =>{
    try{
        console.log("THe owner is ");
        console.log(data);
        
        const sendData= await fetch(`${BASEURL}/owner`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        });
        if(!sendData.ok){
            console.log("enter to error "); 
            //throw new Error("NO SE PUDO CRERA EL USUARIO");
        }
        const owner= await sendData.json();

        return true;
        
    }catch(err:any){
        console.log(err);
        
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },2000)
    }
}