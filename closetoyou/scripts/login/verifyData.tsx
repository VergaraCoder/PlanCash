import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import { BASEURL } from "../connection";



export const verifyLogin = async (email:any,password:any, setError:any, setEnter:any) =>{
    try{
        console.log({...email,...password});
        
        const dataContact = await fetch(`${BASEURL}/auth`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({...email,...password})
        });
        if(!dataContact.ok){
            throw new Error("Credenciales incorrectas");
        }

        const tokens=await dataContact.json();
        console.log(tokens);
        

        await AsyncStorage.setItem("access_token",tokens.access_token);

        await AsyncStorage.setItem("refresh_token",tokens.refresh_token);

        setEnter((prevent:any)=>prevent+1);
        return true;
    }catch(err:any){
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },1500)
    }
}